import Header from "../components/Header";
import RestaurantNavbar from "../components/RestaurantNavbar";
import Menu from "../components/Menu";
import { Item, PrismaClient } from "@prisma/client";

type Props = {
  restaurant: {
    created_at: string;
    updated_at: string;
    slug: string;
    id: number;
    name: string;
    images: string[];
    description: string;
    items: Item[];
  };
};

const prisma = new PrismaClient();

const RestaurantMenu = ({ restaurant }: Props) => {
  return (
    <>
      <Header title={restaurant.name} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavbar slug={restaurant.slug} />
          <Menu menu={restaurant.items} />
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
      items: true,
      name: true,
      slug: true,
      created_at: true,
      updated_at: true,
    },
  });

  const serializedRestaurants = {
    ...restaurant,
    created_at: restaurant?.created_at.toISOString(),
    updated_at: restaurant?.updated_at.toISOString(),
    items: restaurant?.items.map((item) => {
      return {
        ...item,
        created_at: item.created_at.toISOString(),
        updated_at: item.updated_at.toISOString(),
      };
    }),
  };

  return { props: { restaurant: serializedRestaurants } };
}

export default RestaurantMenu;
