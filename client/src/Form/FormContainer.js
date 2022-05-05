import React from 'react'
import Form from './Form'

const FormContainer = () => {
    const formOnSubmit = (e) => {
        e.preventDefault()

    }
    return (
        <>
            <Form formOnSubmit={formOnSubmit} />
        </>
    )
}

export default FormContainer