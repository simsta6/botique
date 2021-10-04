"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdExists = exports.sendFailResponse = exports.isBodyEmpty = exports.constructResponse = void 0;
const constructResponse = (status, data) => ({ status, data });
exports.constructResponse = constructResponse;
const isBodyEmpty = (request) => request.body.constructor === Object && Object.keys(request.body).length === 0;
exports.isBodyEmpty = isBodyEmpty;
const sendFailResponse = (res, message) => void res.status(400).send((0, exports.constructResponse)("Failed", message));
exports.sendFailResponse = sendFailResponse;
const isIdExists = (data, id) => data.some(x => x.id === id);
exports.isIdExists = isIdExists;
//# sourceMappingURL=util.js.map