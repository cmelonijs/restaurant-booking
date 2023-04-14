import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";
import Price from "../../../components/Price";
import { calculateReviewRatingAverage } from "../../../utils/calculateReviewRatingAverage";

type Props = {
  restaurant: {
    created_at: string;
    updated_at: string;
    id: string;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[]
  };
};

const RestaurantCard = ({ restaurant }: Props) => {
  const renderRatingText = () => {
    // console.log('(restaurant.reviews)', restaurant.reviews)
    const rating = calculateReviewRatingAverage(restaurant.reviews);
    if(rating > 4) return "Eccezionale"
    else if(rating <= 4 && rating > 3) return "Buono"
    else if(rating <= 3 && rating > 2) return "Nella media"
     return ""
  }

  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="border-b flex pb-5">
        <img src={restaurant.main_image} alt="" className="w-44 rounded" />
        <div className="pl-5">
          <h2 className="text-3xl">{restaurant.name}</h2>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2 text-sm">{renderRatingText()}</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <p className="mr-4">
                <Price price={restaurant.price} />
              </p>
              <p className="mr-4">{restaurant.cuisine.name}</p>
              <p className="mr-4">{restaurant.location.name}</p>
            </div>
          </div>
          <div className="text-red-600">
            <a href={`/restaurant/${restaurant.slug}`}>View more information</a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
