import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeadlineCards from './components/HeadlineCards';
import Food from './components/Food';
import Category from './components/Category';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Dynamic route content goes here */}
      <Hero />
      <HeadlineCards />
      <Food />
      <Category />
      {/* Add more components as needed */}
    </>
  );
}

export default App;

