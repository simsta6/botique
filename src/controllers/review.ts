import { Request, Response } from "express";
import { Review } from "../interfaces";
import { items, reviews } from "../data";
import { constructResponse, isBodyEmpty, isIdExists, sendFailResponse } from "../util";

export const postReview = (request: Request, res: Response): void => {
  try {
    const newReview: Review = request.body;

    if (isBodyEmpty(request) || newReview.title === "" || newReview.date === "")
      throw new Error();

    res.status(200).send(constructResponse("Success", newReview));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const deleteReview = (request: Request, res: Response): void => {
  try {
    const reviewId = +request.params.id;

    if (isNaN(reviewId) || !isIdExists(reviews, reviewId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const editReview = (request: Request, res: Response): void => {
  try {
    const reviewId = +request.params.id;
    const newReview: Review = request.body;

    if (isNaN(reviewId) || !isIdExists(reviews, reviewId) || isBodyEmpty(request) || newReview.title === "" || newReview.date === "")
      throw new Error();

    res.status(200).send(constructResponse("Success", newReview));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const getReviews = (_request: Request, res: Response): void => {
  try {
    
    res.status(200).send(constructResponse("Success", reviews));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const getReview = (request: Request, res: Response): void => {
  try {
    const reviewId = +request.params.id;

    if (isNaN(reviewId) || !isIdExists(reviews, reviewId))
      throw new Error();

    const review = reviews.find(review => review.id === reviewId);

    res.status(200).send(constructResponse("Success", review));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const getItemRating = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;

    if (isNaN(itemId) || !isIdExists(items, itemId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
  