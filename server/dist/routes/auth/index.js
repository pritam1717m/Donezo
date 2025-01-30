"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const route = (0, express_1.Router)();
route.post("/signin", auth_controller_1.signin);
route.post("/signup", auth_controller_1.signup);
exports.default = route;
