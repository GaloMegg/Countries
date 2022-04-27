import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <Link to="/home" className='header__title'>Henry Countries</Link>
            <Link to="/home/form" className='header__link'>Add Activity</Link>
        </header>
    )
}

export default Header