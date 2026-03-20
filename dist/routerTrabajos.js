"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trabajos_handler_1 = require("./handlers/trabajos.handler");
const cloudinaryTrabajos_1 = require("./config/cloudinaryTrabajos");
const routerTrabajos = (0, express_1.Router)();
// GET  /api/trabajos
routerTrabajos.get('/', trabajos_handler_1.getTrabajos);
// POST /api/trabajos  (multipart/form-data con campo "archivo")
routerTrabajos.post('/', cloudinaryTrabajos_1.uploadTrabajo.single('archivo'), trabajos_handler_1.createTrabajo);
// DELETE /api/trabajos/:id
routerTrabajos.delete('/:id', trabajos_handler_1.deleteTrabajo);
exports.default = routerTrabajos;
//# sourceMappingURL=routerTrabajos.js.map