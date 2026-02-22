import React, { useState } from 'react';
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useParams, useLoaderData } from 'react-router-dom';

const EditFoods = () => {
  const { id } = useParams();
  const { food_title, price, image_url, food_description, category } = useLoaderData();
  
  const foodCategories = [
    "Burgers", "Pasta", "Fries", "Pilau", "Biryani", "Salad",
    "Chicken", "Steak", "Pizza", "Noodles", "Desert", "Drinks"
  ];

  const [selectedFoodCategory, setSelectedFoodCategory] = useState(foodCategories);

  const handleChangeSelectedValue = (event) => {
    setSelectedFoodCategory(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updateFoodObj = {
      food_title: form.food_title.value,
      image_url: form.image_url.value,
      food_description: form.food_description.value,
      category: form.category.value,
      price: form.price.value
    };

    fetch(`http://localhost:5000/food/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFoodObj)
    })
      .then(res => res.json())
      .then(data => {
        alert("Food updated successfully!");
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the food data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* Form 1 */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="food_title" value="Food Title" className="mb-2 block" />
            <TextInput
              id="food_title"
              type="text"
              name="food_title"
              placeholder="Food Name"
              required
              defaultValue={food_title}
            />
          </div>
        </div>

        {/* Form 2 */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="image_url" value="Food Image URL" className="mb-2 block" />
            <TextInput
              id="image_url"
              type="text"
              name="image_url"
              placeholder="Food image URL"
              required
              defaultValue={image_url}
            />
          </div>

          <div className='lg:w-1/2'>
            <Label htmlFor="category" value="Food Category" className="mb-2 block" />
            <Select
              id="category"
              name="category"
              className="w-full rounded"
              value={selectedFoodCategory}
              onChange={handleChangeSelectedValue}
            >
              {foodCategories.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Food Price" />
            </div>
            <TextInput 
              id="price" 
              type="number" 
              name="price"
              placeholder="Food Price" 
              required
            />
          </div>
        </div>

        {/* Food Description */}
        <div>
          <Label htmlFor="food_description" value="Food Description" className="mb-2 block" />
          <Textarea
            id="food_description"
            name="food_description"
            placeholder="Write your food description..."
            required
            className="w-full"
            rows={4}
            defaultValue={food_description}
          />
        </div>

        <Button type="submit">Update Food</Button>
      </form>
    </div>
  );
};

export default EditFoods;
