import React from 'react';
import Banner from '../components/Home/Banner';
import TopScholarships from '../components/Home/TopScholarships';
import SuccessStories from '../components/Home/SuccessStories';
import FAQ from '../components/Home/FAQ';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <>
            <Banner />
            <TopScholarships />
            <SuccessStories />
            <FAQ />
        </>
    );
};

export default Home;