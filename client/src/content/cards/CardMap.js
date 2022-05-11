import React from 'react'
import { Link } from 'react-router-dom'
import ActivityCard from './ActivityCard'
import Card from './Card'

const CardMap = ({ countries, contentType }) => {
    return (
        contentType === "countries" ?
            countries.length > 0 ?
                countries.map((e) => <Card {...e} key={e.id} />) :
                <div className='noActivities__flex'><h1 className='noActivities'>THERE ARE NO COUNTRIES WITH THAT NAME</h1></div>
            :
            countries.length > 0
                ? countries.map((e) => <ActivityCard {...e} key={e.id} />)
                : <div className='noActivities__flex'><h1 className='noActivities'>THERE ARE NO ACTIVITIES</h1> <Link to="/home/form" className='noActivities-CreateOne'>Create one</Link></div>)

}

export default CardMap