import React from 'react';
import logo from '../assets/logo.png'

function Logo(width="100px" ) {
    return (
        <img src={logo} alt="Logo" height={`20px`}  width={width} />
    )
}

export default Logo
