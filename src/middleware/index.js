"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerInputErrors = void 0;
var express_validator_1 = require("express-validator");
var handlerInputErrors = function (req, res, next) {
    //validation
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handlerInputErrors = handlerInputErrors;
