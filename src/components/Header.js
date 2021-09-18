import React from 'react'

function Header(props) {
    return (
        <header>
            <h1 className="text-light">{props.title}</h1>
        </header>
    )
}

export default Header
