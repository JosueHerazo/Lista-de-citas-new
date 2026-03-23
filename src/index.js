"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var colors_1 = require("colors");
var port = process.env.PORT || 4000;
server_1.default.listen(port, function () {
    console.log(colors_1.default.bgMagenta.bold("REST API en el puerto ".concat(port)));
});
