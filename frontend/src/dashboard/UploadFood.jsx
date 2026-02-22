import React, { useState } from 'react'
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";

const UploadFood = () => {
  const foodCategories = [
    "Burgers", "Pasta", "Fries", "Pilau", "Biryani", "Salad",
    "Chicken", "Steak", "Pizza", "Noodles", "Desert", "Drinks"
  ];

  const [selectedFoodCategory, setSelectedFoodCategory] = useState(foodCategories[0]);

  const handleChangeSelectedValue = (event) => {
    setSelectedFoodCategory(event.target.value);
  }

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const food_title = form.food_title.value;
    const image_url = form.image_url.value;
    const food_description = form.food_description.value;
    const category = selectedFoodCategory; // Use the state 
    const price = form.price.value; // Assuming you have a price field in your form

    const foodObj = {
      food_title,
      image_url,
      food_description,
      category,
      price
    };

    console.log(foodObj);

    // send data to DB
    fetch("http://localhost:5000/upload-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodObj)
    })
    .then(res => res.json())
    .then(data => {
      alert("Food Uploaded successfully!!!");
      form.reset();
      setSelectedFoodCategory(foodCategories[0]); // Reset category to default
    });
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A food</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* Form 1 */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="food_title" value="Food Title" />
            </div>
            <TextInput 
              id="food_title" 
              type="text" 
              name="food_title"
              placeholder="Food Name" 
              required
            />
          </div>
        </div>

        {/* Form 2 */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="image_url" value="Food image URL" />
            </div>
            <TextInput 
              id="image_url" 
              type="text" 
              name="image_url"
              placeholder="Food image URL" 
              required
            />
          </div>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Food Category" />
            </div>
            <Select 
              id="category" 
              name="category" 
              className='w-full rounded' 
              value={selectedFoodCategory} 
              onChange={handleChangeSelectedValue}
            >
              {foodCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
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

        {/* Food description */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor="food_description" value="Food Description" />
          </div>
          <Textarea 
            id="food_description"
            name="food_description"
            placeholder="Write your food description..."
            required
            className="w-full"
            rows={4}
          />
        </div>

        <Button type="submit">Upload Food</Button>
      </form>
    </div>
  )
}

export default UploadFood;
