import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ExploreSection from './ExploreSection'
import Categories from './Categories'
import GetStarted from './GetStarted'
import Products from './Products'
import ExclusiveItemSection from './ExclusiveItemSection'
import Diversity from './Diversity'
import Recommendations from '../components/Recommendations'
import styles from '../styles/HomePage/AboutSectioon.module.scss'

type Props = {}

const Homepage = (props: Props) => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <div className={`${styles.recommend}`}><Recommendations /></div>
            <ExploreSection />
            <Categories />
            <GetStarted />
            <div className={`${styles.recommend}`}><Recommendations /></div>
            <Products />
            {/* <ExclusiveItemSection /> */}
            <Diversity />
            <div className={`${styles.recommend} pb-20`}><Recommendations /></div>
        </>
    )
}

export default Homepage