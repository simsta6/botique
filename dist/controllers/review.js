"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemRating = exports.getReview = exports.getReviews = exports.editReview = exports.deleteReview = exports.postReview = void 0;
const data_1 = require("../data");
const util_1 = require("../util");
const postReview = (request, res) => {
    try {
        const newReview = request.body;
        if ((0, util_1.isBodyEmpty)(request) || newReview.title === "" || newReview.date === "")
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success", newReview));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.postReview = postReview;
const deleteReview = (request, res) => {
    try {
        const reviewId = +request.params.id;
        if (isNaN(reviewId) || !(0, util_1.isIdExists)(data_1.reviews, reviewId))
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success"));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.deleteReview = deleteReview;
const editReview = (request, res) => {
    try {
        const reviewId = +request.params.id;
        const newReview = request.body;
        if (isNaN(reviewId) || !(0, util_1.isIdExists)(data_1.reviews, reviewId) || (0, util_1.isBodyEmpty)(request) || newReview.title === "" || newReview.date === "")
            throw new Error();
        res.status(200).send((0, util_1.constructResponse)("Success", newReview));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.editReview = editReview;
const getReviews = (_request, res) => {
    try {
        res.status(200).send((0, util_1.constructResponse)("Success", data_1.reviews));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getReviews = getReviews;
const getReview = (request, res) => {
    try {
        const reviewId = +request.params.id;
        if (isNaN(reviewId) || !(0, util_1.isIdExists)(data_1.reviews, reviewId))
            throw new Error();
        const review = data_1.reviews.find(review => review.id === reviewId);
        res.status(200).send((0, util_1.constructResponse)("Success", review));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, error.message);
    }
};
exports.getReview = getReview;
const getItemRating = (request, res) => {
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
exports.getItemRating = getItemRating;
//# sourceMappingURL=review.js.map