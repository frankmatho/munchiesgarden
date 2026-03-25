import React from 'react'
import Hero from './components/Hero'
import HeadlineCards from './components/HeadlineCards'
import Food from './components/Food'
import Category from './components/Category'

const Home = () => {
  return (
    <>
      <Hero />
      <HeadlineCards />
      <Food />
      <Category />
    </>
  )
}

export default Home