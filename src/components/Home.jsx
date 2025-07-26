import React, { useEffect } from 'react'
import Hero from './Hero'
import About from './About'
import WhyChooseUs from './WhyChooseUs'
import Products from './Products'
import Values from './Values'
import TrustedBy from './TrustedBy'
import FAQ from './FAQ'
import Blog from './Blog'
import Contact from './Contact'
import Reviews from './Reviews'


const Home = ({ addToCart, setBuyNowItem }) => {
  useEffect(() => {
    document.title = "MedVault";
  }, []);
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Products addToCart={addToCart} setBuyNowItem={setBuyNowItem} /> {/* ✅ pass it here */}
      <Values />
      <TrustedBy />
      <Reviews />
      <FAQ />
      <Blog />
      <Contact />
    </>
  )
}

export default Home