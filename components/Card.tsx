import Link from "next/link";
import { RestaurantType } from "../pages";
import Price from "./Price";

interface Props {
  restaurant: RestaurantType;
}

const Card = ({ restaurant }: Props) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
        <img
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine?.name}</p>
            <div className="mr-3">
              <Price price={restaurant.price} />
            </div>
            <p>{restaurant.location?.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
