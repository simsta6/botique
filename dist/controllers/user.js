"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserInfo = void 0;
const data_1 = require("./../data");
const util_1 = require("../util");
const changeUserInfo = (request, res) => {
    try {
        const userId = +request.params.id;
        if (!(0, util_1.isIdExists)(data_1.users, userId)) {
            (0, util_1.idDoesNotExist)(res);
            return;
        }
        if (isNaN(userId) || (0, util_1.isBodyEmpty)(request))
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.changeUserInfo = changeUserInfo;
//# sourceMappingURL=user.js.map