import React from 'react'
import ActivityCard from './ActivityCard'
import Card from './Card'

const CardMap = ({ countries, contentType }) => {
    return (contentType === "countries" ? countries.map((e) => <Card {...e} key={e.id} />) : countries.map((e) => <ActivityCard {...e} prp={e} key={e.id} />))

}

export default CardMap