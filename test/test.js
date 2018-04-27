
let sproto = require(".././sproto");
let fs = require("fs");

function readBinary(filename) {
    let buffer = fs.readFileSync(filename);
    if (!buffer) {
        console.log("not found file(" + filename + ")");
    }
    return buffer;
}

let server = sproto.createNew(readBinary("c2s.spb"));
server.dump();

let serverHost = server.host();
let serverSender = serverHost.attach(sproto.createNew(readBinary("s2c.spb")));

let client = sproto.createNew(readBinary("s2c.spb"));
client.dump();

let clientHost = client.host();
let clientSender = clientHost.attach(sproto.createNew(readBinary("c2s.spb")));

// 客户端请求应答流程
{
    // 1. 客户端传输数据给服务器
    let buffer = clientSender("auth", { code: "aaaabbbbccccdddd", platform: 1 }, 1);

    // 2. 服务端接收处理数据, 再返回数据给客户端
    let ret = serverHost.dispatch(buffer);
    console.log(ret);
    buffer = ret.responseFunc({ result: 0, user: { nickName: "先知比利", sex: 0 } });

    // 3. 客户端接收服务器的返回数据
    ret = clientHost.dispatch(buffer);
    console.log(ret);
}

{
    console.log("================================================================================");
    let session = 1;

    function c2s() {
        function loop(pname, args) {
            let buffer = clientSender(pname, args, session++);
            let ret = serverHost.dispatch(buffer);
            console.log(ret);

            buffer = ret.responseFunc({ result: 1 });

            ret = clientHost.dispatch(buffer);
            console.log(ret);
        }

        loop("startMove", { direction: 1});
        loop("endMove", {});
        loop("startFire", {});
        loop("endFire", {});
    }
    c2s();
    console.log("================================================================================");
}

// 服务器主动推送流程
{
    // 1. 服务器打包数据
    let buffer = serverSender("showPlayer", {
        player: {
            hp: 100,
            mp: 100,
            name: "消失的海灵顿",
            race: "elf",
            level: 99,
            exp: 4,
        }
    });

    // 2. 客户端接收数据
    let ret = clientHost.dispatch(buffer);
    console.log(ret);
}

{
    console.log("================================================================================");
    function s2c() {
        let session = 1;

        function loop(pname, args) {
            let buffer = serverSender(pname, args, session++);

            let ret = clientHost.dispatch(buffer);
            console.log(ret);
        }

        loop("startMovePlayer", {
            direction: 1,
            playerId: 2,
        });

        loop("endMovePlayer", {
            playerId: 2,
        });

        loop("startPlayerFire", {
            playerId: 2,
            weaponId: 4,
        });

        loop("endPlayerFire", {
            playerId: 2,
            weaponId: 4,
        });
    }
    s2c();
    console.log("================================================================================");
}

