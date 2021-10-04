"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToChart = exports.getAllItemsInChart = void 0;
const data_1 = require("../data");
const util_1 = require("../util");
const getAllItemsInChart = (_request, res) => {
    try {
        res.status(200).send((0, util_1.constructResponse)("Success", data_1.chart));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getAllItemsInChart = getAllItemsInChart;
const addItemToChart = (request, res) => {
    try {
        const itemId = +request.params.id;
        if (isNaN(itemId) || !(0, util_1.isIdExists)(data_1.items, itemId))
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.addItemToChart = addItemToChart;
//# sourceMappingURL=chart.js.map