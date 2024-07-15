import React from 'react';
import AppNavbar from '../nav';
import SearchResultsPage from '.';
import Footer from '../footer';

const LayoutSearch = () => {
    return (
        <div className='bg-black pt-10 h-[100vh]'>
            <AppNavbar/>
            <SearchResultsPage/>
            <Footer/>
        </div>
    );
};

export default LayoutSearch;