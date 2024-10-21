import React from 'react'
import ClientHome from '../../Components/UserComponent/UserHome'
import Navbar from '../../Components/Common/UserCommon/Navbar'
import Footer from '../../Components/Common/UserCommon/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
        <ClientHome/>
        <Footer/>
    </>
  )
}

export default Home
