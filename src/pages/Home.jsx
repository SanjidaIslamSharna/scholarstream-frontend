import React from 'react';
import Banner from '../components/home/Banner';
import TopScholarships from '../components/home/TopScholarships';
import SuccessStories from '../components/home/SuccessStories';
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