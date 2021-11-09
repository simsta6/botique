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
exports.getReview = exports.getReviews = exports.editReview = exports.deleteReview = exports.postReview = void 0;
const util_1 = require("../util");
const review_1 = require("../models/review");
const item_1 = require("../models/item");
const postReview = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        if (yield (0, util_1.isWrongId)(item_1.Item, itemId)) {
            throw new Error("Wrong item id");
        }
        const review = request.body;
        const { isValid, message } = isReviewValid(review);
        if (!isValid)
            throw new Error(message);
        const newReview = yield review_1.Review.create(Object.assign(Object.assign({}, review), { user: (0, util_1.ObjectId)(request.user.user_id), item: (0, util_1.ObjectId)(itemId) }));
        res.status(201).send((0, util_1.constructResponse)("Success", newReview));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.postReview = postReview;
const deleteReview = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        const reviewId = request.params.reviewId;
        if (yield (0, util_1.isWrongId)(item_1.Item, itemId)) {
            throw new Error("Wrong item id");
        }
        if (yield (0, util_1.isWrongId)(review_1.Review, reviewId)) {
            throw new Error("Wrong review id");
        }
        yield review_1.Review.findOneAndDelete({ _id: reviewId, item: itemId });
        res.status(200).send();
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.deleteReview = deleteReview;
const editReview = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        const reviewId = request.params.reviewId;
        if (yield (0, util_1.isWrongId)(item_1.Item, itemId)) {
            throw new Error("Wrong item id");
        }
        if (yield (0, util_1.isWrongId)(review_1.Review, reviewId)) {
            throw new Error("Wrong review id");
        }
        const review = request.body;
        const { isValid, message } = isReviewValid(review);
        if (!isValid)
            throw new Error(message);
        const reviews = yield review_1.Review.findOneAndUpdate({ _id: reviewId, item: itemId }, Object.assign({}, review), { new: true });
        res.status(200).send((0, util_1.constructResponse)("Success", reviews));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.editReview = editReview;
const getReviews = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        if (yield (0, util_1.isWrongId)(item_1.Item, itemId)) {
            throw new Error("Wrong item id");
        }
        const reviews = yield review_1.Review.find({ item: itemId });
        res.status(200).send((0, util_1.constructResponse)("Success", reviews));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getReviews = getReviews;
const getReview = (request, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = request.params.id;
        const reviewId = request.params.reviewId;
        if (yield (0, util_1.isWrongId)(item_1.Item, itemId)) {
            throw new Error("Wrong item id");
        }
        if (yield (0, util_1.isWrongId)(review_1.Review, reviewId)) {
            throw new Error("Wrong review id");
        }
        const reviews = yield review_1.Review.find({ item: itemId }).findOne({ _id: reviewId });
        res.status(200).send((0, util_1.constructResponse)("Success", reviews));
    }
    catch (error) {
        (0, util_1.sendFailResponse)(res, 400, error.message);
    }
});
exports.getReview = getReview;
const isReviewValid = (review) => {
    const { rating, comment } = review;
    if (!(rating && comment))
        return { isValid: false, message: "You need to fill all fields!" };
    if (rating > 5 || rating < 1)
        return { isValid: false, message: "Rating should be between 1 and 5!" };
    return { isValid: true, message: "Success" };
};
//# sourceMappingURL=review.js.map