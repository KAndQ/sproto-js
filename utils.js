var utils = (function() {
    var t = {};

    t.array2arraybuffer = function(array) {
        var b = new ArrayBuffer(array.length);
        var v = new DataView(b, 0);
        for (var i = 0; i < array.length; i++) {
            v.setUint8(i, array[i]);
        }
        return b;
    }

    t.arraybuffer2array = function(buffer) {
        var v = new DataView(buffer, 0);
        var a = new Array();
        for (var i = 0; i < v.byteLength; i++) {
            a[i] = v.getUint8(i);
        }
        return a;
    }

    t.string2utf8 = function(str) {
        var back = [];
        var byteSize = 0;

        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            if (0x00 <= code && code <= 0x7f) {
                byteSize += 1;
                back.push(code);
            } else if (0x80 <= code && code <= 0x7ff) {
                byteSize += 2;
                back.push((192 | (31 & (code >> 6))));
                back.push((128 | (63 & code)))
            } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) {
                byteSize += 3;
                back.push((224 | (15 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)))
            }
        }

        for (i = 0; i < back.length; i++) {
            back[i] &= 0xff;
        }

        return back;
    };

    t.utf82string = function(arr) {
        if (typeof arr === 'string') {
            return null;
        }

        var UTF = '';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == null) {
                break;
            }

            var one = arr[i].toString(2);
            var v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = arr[i].toString(2).slice(7 - bytesLength);

                for (var st = 1; st < bytesLength; st++) {
                    store += arr[st + i].toString(2).slice(2);
                }
                UTF += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                UTF += String.fromCharCode(arr[i]);
            }
        }
        return UTF;
    };

    t.arrayconcat = function(a1, a2) {
        var b = new Array();

        for (var i = 0; i < a1.length; i++) {
            b[i] = a1[i];
        }

        for (var j = a1.length; j < a1.length + a2.length; j++) {
            b[j] = a2[j - a1.length];
        }

        return b;
    };

    return t;
}());

module.exports = utils;