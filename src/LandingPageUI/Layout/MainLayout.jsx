import React from 'react';
import Nav from '../Components/Header/Nav';
import Hero from './../Pages/Hero';
import Statistics from './../Pages/Statistics';
import Industry from './../Pages/Industry';
import Gallery from './../Pages/Gallery';
import BlogResearch from './../Pages/BlogResearch';
import FAQ from './../Pages/FAQ';
import CTAFooter from '../Pages/CTAFooter';

const MainLayout = () => {
    return (
        <div>
            
            <Hero/>
            <Statistics/>
            <Industry/>
            <Gallery/>
            <BlogResearch/>
            <FAQ/>
            {/* <CTAFooter/> */}
        </div>
    );
};

export default MainLayout;