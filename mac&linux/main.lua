
--[[
1. 启动控制台;
2. cd 到当前文件所在目录;
3. 将协议定义的文件放在 proto 文件夹里面(以 sp 为后缀);
4. 运行 ./skynet_$platform $platform.config, 例如: ./skynet_linux linux.config
5. 生成的 spb 后缀文件就是需要的内容.
--]]

local io = require "io"
local skynet = require "skynet"
require "skynet.manager"
local sprotoparser = require "sprotoparser"

skynet.start(function()
    local inputFiles = {
        "proto/s2c.sp",
        "proto/c2s.sp",
    }

    local function readFile(spFilename)
        local file = io.open(spFilename)
        if not file then
            skynet.error(string.format("can not open file(%s)", spFilename))
            return nil
        end

        local data = file:read("a")
        file:close()

        return data
    end

    local function getFileNameNoExtend(spFilename)
        return string.sub(spFilename, 1, string.find(spFilename, ".", 1, true) - 1)
    end

    for _, v in ipairs(inputFiles) do
        local data = readFile(v)
        if data then
            local spbdata = sprotoparser.parse(data)
            local filename = getFileNameNoExtend(v) .. ".spb"
            local file = io.open(filename, "wb")
            file:write(spbdata)
            file:close()
        end
    end

    skynet.timeout(100, function()
        skynet.abort()
    end)
end)


