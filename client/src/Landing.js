import React from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
    return (
        <div className='landing'>
            <Link to="/home" className='landing__btn'>Home</Link>
        </div>
    )
}

export default Landing