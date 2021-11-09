import { Response } from "express";
import { constructResponse, isWrongId, ObjectId, sendFailResponse } from "../util";
import { IReview } from "../models/review";
import { Review } from "../models/review";
import { Request } from "../interfaces";
import { Item } from "../models/item";

export const postReview = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;
    if (await isWrongId(Item, itemId)) {   
      throw new Error("Wrong item id");
    }

    const review: IReview = request.body;
    const {isValid, message} = isReviewValid(review);
    if (!isValid) 
      throw new Error(message);
    
    const newReview = await Review.create({ ...review, user: ObjectId(request.user.user_id), item: ObjectId(itemId) });

    res.status(201).send(constructResponse("Success", newReview));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const deleteReview = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;
    const reviewId = request.params.reviewId;

    if (await isWrongId(Item, itemId)) {   
      throw new Error("Wrong item id");
    }

    if (await isWrongId(Review, reviewId)) {   
      throw new Error("Wrong review id");
    }
    
    await Review.findOneAndDelete({_id: reviewId, item: itemId});

    res.status(200).send();
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const editReview = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;
    const reviewId = request.params.reviewId;

    if (await isWrongId(Item, itemId)) {   
      throw new Error("Wrong item id");
    }

    if (await isWrongId(Review, reviewId)) {   
      throw new Error("Wrong review id");
    }

    const review: IReview = request.body;
    const {isValid, message} = isReviewValid(review);
    if (!isValid) 
      throw new Error(message);

    const reviews = await Review.findOneAndUpdate({_id: reviewId, item: itemId}, {...review}, { new: true });

    res.status(200).send(constructResponse("Success", reviews));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const getReviews = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;

    if (await isWrongId(Item, itemId)) {   
      throw new Error("Wrong item id");
    }
    
    const reviews = await Review.find({item: itemId});

    res.status(200).send(constructResponse("Success", reviews));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const getReview = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;
    const reviewId = request.params.reviewId;

    if (await isWrongId(Item, itemId)) {   
      throw new Error("Wrong item id");
    }

    if (await isWrongId(Review, reviewId)) {   
      throw new Error("Wrong review id");
    }
    
    const reviews = await Review.find({item: itemId}).findOne({_id: reviewId});

    res.status(200).send(constructResponse("Success", reviews));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

const isReviewValid = (review: IReview): {isValid: boolean, message: string} => {
  const { rating, comment } = review;

  if (!(rating && comment))
    return { isValid: false, message: "You need to fill all fields!" };

  if (rating > 5 || rating < 1)
    return { isValid: false, message: "Rating should be between 1 and 5!"};
  
  return { isValid: true, message: "Success" };
};
