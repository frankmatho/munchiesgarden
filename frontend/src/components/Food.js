import React, { useEffect, useState, useContext } from 'react';
import { data as localData } from '../data/data.js'; // renamed to avoid naming conflict
import { CartContext } from '../context/CartContext';

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [displayedFoods, setDisplayedFoods] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Fetch and merge data
  useEffect(() => {
    fetch("http://localhost:5000/all-foods")
      .then(res => res.json())
      .then(remoteData => {
        const combined = [...localData, ...remoteData];
        setFoods(combined);
        setDisplayedFoods(combined.slice(0, 8));
      })
      .catch(() => {
        // Fallback to only local data if backend fails
        setFoods(localData);
        setDisplayedFoods(localData.slice(0, 8));
      });
  }, []);

  // Filter by type
  const filterType = (category) => {
    const filtered = foods.filter((item) => item.category === category);
    setDisplayedFoods(showAll ? filtered : filtered.slice(0, 8));
  };

  // Filter by price
  const filterPrice = (price) => {
    const filtered = foods.filter((item) => item.price === price);
    setDisplayedFoods(showAll ? filtered : filtered.slice(0, 8));
  };

  const resetFilters = () => {
    setDisplayedFoods(showAll ? foods : foods.slice(0, 8));
  };

  const toggleView = () => {
    setShowAll(prev => {
      const newState = !prev;
      setDisplayedFoods(newState ? foods : foods.slice(0, 8));
      return newState;
    });
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Top Rated Menu Items
      </h1>

      {/* Filters */}
      <div className='flex flex-col lg:flex-row justify-between'>
        <div>
          <p className='font-bold text-gray-700'>Filter Type</p>
          <div className='flex flex-wrap'>
            <button onClick={resetFilters} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>All</button>
            <button onClick={() => filterType('burger')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>Burgers</button>
            <button onClick={() => filterType('pizza')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>Pizza</button>
            <button onClick={() => filterType('salad')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>Salads</button>
            <button onClick={() => filterType('chicken')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>Chicken</button>
          </div>
        </div>

        <div>
          <p className='font-bold text-gray-700'>Filter Price</p>
          <div className='flex justify-between max-w-[390px] w-full'>
            <button onClick={() => filterPrice('$')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>$</button>
            <button onClick={() => filterPrice('$$')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>$$</button>
            <button onClick={() => filterPrice('$$$')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>$$$</button>
            <button onClick={() => filterPrice('$$$$')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'>$$$$</button>
          </div>
        </div>
      </div>

      {/* Display Foods */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {displayedFoods.map((item, index) => (
          <div
            key={item._id || item.id || index}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
          >
            <img
              src={item.image_url || item.image}
              alt={item.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{item.name || item.food_title}</p>
              <button
                onClick={() => addToCart(item)}
                className='bg-orange-500 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center'
              >
                +
              </button>
              <p>
                <span className='bg-orange-500 text-white p-1 rounded-full'>
                  {item.price || item.food_price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {foods.length > 8 && (
        <div className='text-center mt-6'>
          <button
            onClick={toggleView}
            className='bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition duration-300'
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Food;
