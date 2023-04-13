import { Item } from "@prisma/client";

const Menu = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.map((dish) => (
            <div key={dish.id} className=" border rounded p-3 w-[49%] mb-3">
              <h3 className="font-bold text-lg">{dish.name}</h3>
              <p className="font-light mt-1 text-sm">{dish.description}</p>
              <p className="mt-7">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Menu;
