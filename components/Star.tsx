import { Review } from "@prisma/client";
import fullStar from '../public/icons/full-star.png'
import halfStar from '../public/icons/half-star.png'
import emptyStar from '../public/icons/empty-star.png'
import Image from 'next/image'
import { calculateReviewRatingAverage } from "../utils/calculateReviewRatingAverage";

type Props = {
  reviews: Review[]
}

const Star = ({reviews}: Props) => {
    const rating = calculateReviewRatingAverage(reviews);
    const renderStars = () => {
        const stars = [];
        for(let i = 0; i < 5; i++) {
            const difference = parseFloat((rating - i).toFixed(1));
            if(difference >= 1) stars.push(fullStar)
            else if(difference < 1 && difference > 0) {
                if(difference<= .2) stars.push(emptyStar)
                else if(difference > .2 && difference <= .6) stars.push(halfStar)
                else stars.push(fullStar)
            }
            else stars.push(emptyStar)
        }
        return stars.map(star => (
            <Image src={star} className="w-4 h-4 mr-1" alt="*" />
        ))
    }

    return (
        <div className="flex items-center">
            {renderStars()}
        </div>
    )
}

export default Star;