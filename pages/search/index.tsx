import Link from "next/link";
import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurantCard from "./components/RestaurantCard";
import { Location, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {
  restaurants: {
    created_at: string;
    updated_at: string;
    id: string;
    name: string;
    main_image: string;
    price: string;
    cuisine: string;
    location: Location;
    slug: string;
  }[];
};

const Search = ({ restaurants }: Props) => {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((res: any) => <RestaurantCard restaurant={res} />)
          ) : (
            <p>Non sono stati trovati ristoranti in questa località</p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const location = context.query.city.toLowerCase();
  let restaurants;

  if (!location) {
    restaurants = await prisma.restaurant.findMany({
      select: {
        created_at: true,
        updated_at: true,
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
      },
    });
  }

  restaurants = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: location,
        },
      },
    },
    select: {
      created_at: true,
      updated_at: true,
      id: true,
      name: true,
      main_image: true,
      price: true,
      cuisine: true,
      location: true,
      slug: true,
    },
  });

  const serializedRestaurants = restaurants.map((res) => {
    return {
      ...res,
      location: {
        ...res.location,
        created_at: res.location.created_at.toISOString(),
        updated_at: res.location.updated_at.toISOString(),
      },
      cuisine: {
        ...res.cuisine,
        created_at: res.cuisine.created_at.toISOString(),
        updated_at: res.cuisine.updated_at.toISOString(),
      },
      created_at: res.created_at.toISOString(),
      updated_at: res.updated_at.toISOString(),
    };
  });

  return { props: { restaurants: serializedRestaurants } };
}

export default Search;
