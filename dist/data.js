"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellers = exports.users = exports.reviews = exports.orders = exports.itemsWaitingForApproval = exports.chart = exports.items = void 0;
exports.items = [
    { id: 1, label: "first item", color: "FFFFFF" },
    { id: 2, label: "second item", color: "000000" }
];
exports.chart = [
    { id: 1, count: 1 }
];
exports.itemsWaitingForApproval = [
    { id: 3, label: "second item", color: "000000" }
];
exports.orders = [
    {
        id: 1,
        address: "random address data",
        items: [{ id: 1, count: 1 }],
        sellerId: 5,
        state: "approved"
    }
];
exports.reviews = [
    {
        id: 1,
        itemId: 1,
        userId: 1,
        title: "AAAA",
        date: "NOT HAPPY",
        rating: 5
    }
];
exports.users = [
    {
        id: 1,
        name: "User1",
        address: ""
    }
];
exports.sellers = [
    {
        id: 1,
        name: "Seller1",
        address: "",
        shopName: "Maxima"
    }
];
//# sourceMappingURL=data.js.map