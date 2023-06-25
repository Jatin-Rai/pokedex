import React from 'react';

// ** Components Imports
import { Footer, Header, Listing, Navigation, Search } from '../components'

const Home = () => {

    return (
        <>
            <Header />
            <Search />
            <Navigation />
            <Listing />
            <Footer />
        </>
    )
}

export default Home