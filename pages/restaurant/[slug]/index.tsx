import Link from "next/link";
import Header from "./components/Header";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {
  restaurant: {
    created_at: string;
    updated_at: string;
    slug: string;
    id: number;
    name: string;
    images: string[];
    description: string;
  };
};

const RestaurantDetailsPage = ({ restaurant }: Props) => {
  console.log("restaurant inside component", restaurant);
  return (
    <>
      <Header title={restaurant.name} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNavbar slug={restaurant?.slug} />
          <Title name={restaurant.name} />
          <Rating />
          <Description description={restaurant.description} />
          <Images images={restaurant.images} />
          <Reviews />
        </div>
        <div className="w-[27%] relative text-reg">
          <ReservationCard />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const slug = context.params.slug;

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      created_at: true,
      updated_at: true,
    },
  });

  const serializedRestaurants = {
    ...restaurant,
    created_at: restaurant?.created_at.toISOString(),
    updated_at: restaurant?.updated_at.toISOString(),
  };

  return { props: { restaurant: serializedRestaurants } };
}

export default RestaurantDetailsPage;
