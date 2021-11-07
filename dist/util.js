"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = exports.isWrongId = exports.isNumberPositive = exports.isNumeric = exports.idDoesNotExist = exports.isIdExists = exports.sendFailResponse = exports.isBodyEmpty = exports.constructResponse = void 0;
const mongoose_1 = require("mongoose");
const constructResponse = (status, data) => ({ status, data });
exports.constructResponse = constructResponse;
const isBodyEmpty = (request) => request.body.constructor === Object && Object.keys(request.body).length === 0;
exports.isBodyEmpty = isBodyEmpty;
const sendFailResponse = (res, statusCode = 400, message) => {
    void res.status(statusCode).send((0, exports.constructResponse)("Failed", message));
};
exports.sendFailResponse = sendFailResponse;
const isIdExists = (data, id) => data.some(x => x.id === id);
exports.isIdExists = isIdExists;
const idDoesNotExist = (res) => void res.status(404).send((0, exports.constructResponse)("Failed", "ID does not exist"));
exports.idDoesNotExist = idDoesNotExist;
// TODO: fix this
const isNumeric = (str) => {
    return str && true;
};
exports.isNumeric = isNumeric;
const isNumberPositive = (number) => number > 0;
exports.isNumberPositive = isNumberPositive;
// eslint-disable-next-line @typescript-eslint/ban-types
const isWrongId = (model, _id) => __awaiter(void 0, void 0, void 0, function* () { return !((0, mongoose_1.isValidObjectId)(_id) && (yield model.exists({ _id }))); });
exports.isWrongId = isWrongId;
const ObjectId = (id) => new mongoose_1.Types.ObjectId(id);
exports.ObjectId = ObjectId;
//# sourceMappingURL=util.js.map