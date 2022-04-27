import React from 'react'
import { useDispatch } from 'react-redux'
import { searchCountry } from "../../redux/actions"
const NavBar = () => {
    const disp = useDispatch()
    const HandlerChanges = (e) => {
        disp(searchCountry(e.target.value))
    }
    return (
        <nav className='nav'>
            <input type="text" name="" id="" placeholder='&#128270; Buscar' onChange={HandlerChanges} />
            <a href="">Add Activity</a>
            <a href="">Add Activity</a>
            <a href="">Add Activity</a>
            <a href="">Add Activity</a>
        </nav>
    )
}

export default NavBar