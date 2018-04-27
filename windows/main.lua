
local sprotoparser = require "sprotoparser"
local io = require "io"

local protos = {
    "proto/s2c.sp",
    "proto/c2s.sp",
}

local function readFile(filename)
    local file = io.open(filename)
    if file then
        local data = file:read("*a")
        file:close()
        return data
    end
    return nil
end

local function getFilenameNoExtension(filename)
    return string.sub(filename, 1, string.find(filename, ".", 1, true) - 1)
end

for _, v in ipairs(protos) do
    local text = readFile(v)
    local file = io.open(getFilenameNoExtension(v) .. ".spb", "wb")
    file:write(sprotoparser.parse(text))
    file:close()
end

