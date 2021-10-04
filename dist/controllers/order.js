"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAnOrder = void 0;
const data_1 = require("../data");
const util_1 = require("../util");
const makeAnOrder = (request, res) => {
    try {
        const isValidAddress = true;
        if (!data_1.chart.length || !isValidAddress)
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.makeAnOrder = makeAnOrder;
//# sourceMappingURL=order.js.map