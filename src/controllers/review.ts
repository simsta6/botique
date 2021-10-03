import { Request, Response } from "express";
import { constructResponse } from "../interfaces";
import { reviews } from "../data";

export interface Review {
  id: number;
  itemId: number;
  userId: number;
  title: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const addReview = (request: Request, res: Response): void => {
  const review: Review = request.body;

  if (review.title === "" || review.date === "") {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  res.status(200).send(constructResponse("Success", review));
};

export const deleteReview = (request: Request, res: Response): void => {
  const id = +request.params.id;

  const isReviewExists = true;

  if (!isReviewExists) {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  res.status(200).send(constructResponse("Success"));
};

export const editReview = (request: Request, res: Response): void => {
  const id = +request.params.id;
  const newReview: Review = request.body;

  if (newReview.title === "" || newReview.date === "") {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  res.status(200).send(constructResponse("Success"));
};

export const getReviews = (_request: Request, res: Response): void => {
  res.status(200).send(constructResponse("Success", reviews));
};

export const getReview = (request: Request, res: Response): void => {
  const itemId = +request.params.id;

  res.status(200).send(constructResponse("Success"));
};

export const getItemRating = (request: Request, res: Response): void => {
  const itemId = +request.params.id;

  // const rating = reviews.map(review => itemId === review.itemId && )

  res.status(200).send(constructResponse("Success"));
};
  