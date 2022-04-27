import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActivity } from '../redux/actions'
const Form = () => {
    const [formInfo, setFormInfo] = useState({})
    const dispatch = useDispatch()

    const asd = (e) => {
        e.preventDefault()
        dispatch(postActivity(formInfo))
    }
    const handleChanges = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className='' onSubmit={asd}>
            <input type="text" placeholder='Name' name="name" className='' onChange={handleChanges} />
            <input type="number" placeholder='Duration' name="duration" className='' onChange={handleChanges} />
            <input type="number" placeholder='Dificulty' name='dificulty' className='' onChange={handleChanges} />
            <label htmlFor="season">Season</label>
            <select name="season" id="season" onChange={handleChanges} >
                <option value="spring" defaultValue >Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
            </select>
            <select name="country" id="" onBlur={handleChanges} >
                <option value="arg" defaultValue>Argentina</option>
            </select>
            <button type="submit" disabled={false} style={{ "width": "100px" }}></button>
        </form>
    )
}

export default Form