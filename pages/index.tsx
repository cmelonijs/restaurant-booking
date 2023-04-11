import Header from "../components/Header";
import Card from "../components/Card";
import { PrismaClient, Cuisine, Location, PRICE } from "@prisma/client";
export interface RestaurantType {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  slug: string;
  created_at: string | Date;
  updated_at: string | Date;
}

interface Props {
  restaurants: RestaurantType[];
}

const prisma = new PrismaClient();

export default function Home(props: Props) {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {props.restaurants &&
          props.restaurants.map((res: RestaurantType) => (
            <Card key={res.id} restaurant={res} />
          ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      price: true,
      location: true,
      cuisine: true,
      slug: true,
      created_at: true,
      updated_at: true,
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
