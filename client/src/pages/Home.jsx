import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import QuoteSection from '../components/QuoteSection.jsx'
import Mockup from '../components/Mockup.jsx'
import Usecases from '../components/Usecases.jsx'
import FAQ from '../components/FAQ.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <>
      <div className = "bg-[#efd4e7]">
        <Navbar />
        <Header />
        <Mockup />
        <Usecases />
        <FAQ />
        {/* <QuoteSection /> */}
        <Footer />
      </div>
    </>
  )
}

export default Home