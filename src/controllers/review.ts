import { Request, Response } from "express";
import { Review } from "../interfaces";
import { reviews } from "../data";
import { constructResponse, idDoesNotExist, isBodyEmpty, isIdExists, sendFailResponse } from "../util";

export const postReview = (request: Request, res: Response): void => {
  try {
    const newReview: Review = request.body;
    const itemId = +request.params.id;

    if (!isIdExists(reviews, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isBodyEmpty(request) || newReview.title === "" || newReview.date === "")
      throw new Error();

    res.status(201).send(constructResponse("Success", newReview));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const deleteReview = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;
    const reviewId = +request.params.reviewId;

    if (!isIdExists(reviews, reviewId) || !isIdExists(reviews, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(reviewId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const editReview = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;
    const reviewId = +request.params.reviewId;
    const newReview: Review = request.body;

    if (!isIdExists(reviews, reviewId) || !isIdExists(reviews, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(reviewId) || isBodyEmpty(request) || newReview.title === "" || newReview.date === "")
      throw new Error();

    res.status(200).send(constructResponse("Success", newReview));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const getReviews = (request: Request, res: Response): void => {
  try {

    const itemId = +request.params.id;

    if (!isIdExists(reviews, itemId)) {
      idDoesNotExist(res);
      return;
    }
    
    res.status(200).send(constructResponse("Success", reviews));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const getReview = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;
    const reviewId = +request.params.reviewId;

    if (!isIdExists(reviews, reviewId) || !isIdExists(reviews, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(reviewId))
      throw new Error();

    const review = reviews.find(review => review.id === reviewId);

    res.status(200).send(constructResponse("Success", review));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
