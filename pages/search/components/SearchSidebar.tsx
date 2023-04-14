import { Location, Cuisine } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  locations: Location[],
  cuisines: Cuisine[]
}

const SearchSidebar = ({locations, cuisines}: Props) => {
  const router = useRouter()
  const [queries, setQueries] = useState({
    location: '',
    cuisine: '',
    price: ''
  })
  const {location, cuisine, price} = queries;

  const buildQuery = (location: string, cuisine: string, price: string) => {
    return `/search${location ? `?city=${location}` : `?city=ottawa`}${cuisine && `&cuisine=${cuisine}`}${price && `&price=${price}`}`
  };

  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc: Location) => (
          <p onClick={() => setQueries({...queries, location: loc.name})} key={loc.id} className="font-light text-reg">{loc.name}</p>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine: Cuisine) => (
          <p onClick={() => setQueries({...queries, cuisine: cuisine.name})} key={cuisine.id} className="font-light text-reg">{cuisine.name}</p>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button onClick={() => setQueries({...queries, price: 'CHEAP'})} className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button onClick={() => setQueries({...queries, price: 'REGULAR'})} className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button onClick={() => setQueries({...queries, price: 'EXPENSIVE'})} className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button>
        </div>
      </div>
      {(location || cuisine || price) && <button onClick={() => router.push(`${buildQuery(location, cuisine, price)}`)} style={{border: '1px solid red'}}>cerca</button>}
      </div>
)}

export default SearchSidebar
      
