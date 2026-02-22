import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageFoods = () => {
  const [allFoods, setAllFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-foods")
      .then(res => res.json())
      .then(data => setAllFoods(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/food/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        alert("Food is deleted successfully");
        // Optionally re-fetch data or remove item from local state
        setAllFoods(prev => prev.filter(food => food._id !== id));
      });
  };

  return (
    <div className='px-4 my-12 relative z-10'> {/* Ensure this container sets z-index context */}
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Food</h2>
      <Table className='relative z-10 lg:w-[1180px]'>
  <Table.Head>
    <Table.HeadCell>N.o</Table.HeadCell>
    <Table.HeadCell>Food name</Table.HeadCell>
    <Table.HeadCell>Category</Table.HeadCell>
    <Table.HeadCell>Prices</Table.HeadCell>
    <Table.HeadCell>
      <span>Edit or Manage</span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className='divide-y'>
    {allFoods.map((food, index) => (
      <Table.Row
        key={food._id}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {index + 1}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {food.food_title}
        </Table.Cell>
        <Table.Cell>{food.category}</Table.Cell>
        <Table.Cell> Ksh {food.price}</Table.Cell>
        <Table.Cell>
          <Link
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
            to={`/admin/dashboard/editfoods/${food._id}`}
          >
            Edit
          </Link>
          <button
            className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'
            onClick={() => handleDelete(food._id)}
          >
            Delete
          </button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>

    </div>
  );
};

export default ManageFoods;
