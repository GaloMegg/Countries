import React from 'react'
import Form from './Form'

const FormContainer = () => {
    const formOnSubmit = (e) => {
        e.preventDefault()

    }
    return (
        <div>
            <Form formOnSubmit={formOnSubmit} />
        </div>
    )
}

export default FormContainer