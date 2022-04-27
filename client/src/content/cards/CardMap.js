import React from 'react'
import Card from './Card'

const CardMap = ({ countries }) => {
    return (
        countries.map((e) => <Card {...e} key={e.id} />)
    )
}

export default CardMap