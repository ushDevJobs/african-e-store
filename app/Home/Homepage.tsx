import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ExploreSection from './ExploreSection'
import Categories from './Categories'
import GetStarted from './GetStarted'
import Products from './Products'
import ExclusiveItemSection from './ExclusiveItemSection'
import Diversity from './Diversity'

type Props = {}

const Homepage = (props: Props) => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ExploreSection />
            <Categories />
            <GetStarted />
            <Products />
            {/* <ExclusiveItemSection /> */}
            <Diversity/>
        </>
    )
}

export default Homepage