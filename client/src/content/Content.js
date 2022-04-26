import React from 'react'
import CardsContainer from './cards/CardsContainer'
import NavBar from './nav/NavBar'

const Content = () => {
    return (
        <section className='content'>
            <NavBar />
            <CardsContainer />
        </section>
    )
}

export default Content