import React from 'react'
const DEV_DATA = [
    {
        "name": 'Twitter',
        "url": "https://twitter.com/Wtscrackin"
    },
    {
        "name": 'Linked-In',
        "url": "https://www.linkedin.com/in/galomeggiolaro/"
    }, {
        "name": 'Portfolio',
        "url": "https://galomegg.github.io/portfolio/"
    },]
const Footer = () => {
    return (
        <footer className='footer'>
            <p>Developed By:</p>
            {DEV_DATA.map(e => <a href={e.url} key={e.url} className='footer__link'> {e.name}</a>)}
        </footer>
    )
}

export default Footer