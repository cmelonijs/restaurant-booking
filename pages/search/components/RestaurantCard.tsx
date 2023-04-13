import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import Price from "../../../components/Price";

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
  };
};

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="border-b flex pb-5">
        <img src={restaurant.main_image} alt="" className="w-44 rounded" />
        <div className="pl-5">
          <h2 className="text-3xl">{restaurant.name}</h2>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2 text-sm">Awesome</p>
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
