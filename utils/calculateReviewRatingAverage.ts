import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) => {
    if(!reviews.length) return 0
    const sum = reviews.reduce((acc, cur) => acc + cur.rating, 0);
    return sum / reviews.length
}