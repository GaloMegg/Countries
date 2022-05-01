import React from 'react'
import CardsContainer from './cards/CardsContainer'
import NavBar from './nav/NavBar'
import Header from '../header/Header'
import { Route, Routes } from 'react-router-dom'
import Form from '../Form/Form'
import CountryDetailContainer from './detail/CountryDetailContainer'
const Content = () => {
    return (
        <>
            <Header />
            <section className='content'>
                <Routes >
                    <Route path="/form" element={<Form />} />
                    <Route path="/" element={<><CardsContainer /><NavBar />  </>} />
                    <Route path="/details/:id" element={<CountryDetailContainer />} />
                </Routes>
            </section>
        </>
    )
}

export default Content