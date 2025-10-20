import React from 'react';

import Hero from './../Pages/Hero';
import Statistics from './../Pages/Statistics';
import Industry from './../Pages/Industry';
import Gallery from './../Pages/Gallery';
import BlogResearch from './../Pages/BlogResearch';
import FAQ from './../Pages/FAQ';
import TrainingNCertification from '../Components/TrainingNCertification';

const MainLayout = () => {
    return (
        <div>
            
            <Hero/>
            <Statistics/>
            <Industry/>
            <TrainingNCertification/>
            <Gallery/>
            <BlogResearch/>
            <FAQ/>
            {/* <CTAFooter/> */}
        </div>
    );
};

export default MainLayout;