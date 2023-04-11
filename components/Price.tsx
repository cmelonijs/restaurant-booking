import { PRICE } from "@prisma/client";

const Price = ({ price }: { price: PRICE }) => {
  return (
    <>
      {price === PRICE.CHEAP && (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      )}
      {price === PRICE.REGULAR && (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      )}
      {price === PRICE.EXPENSIVE && (
        <>
          <span>$$$$</span>
        </>
      )}
    </>
  );
};

export default Price;
