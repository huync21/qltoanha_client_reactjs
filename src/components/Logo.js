import React from 'react'
// import styled from 'styled-components'
import '../css/font.css'
import '../css/logo.css'

const Logo = (props) => {
    return (
        <div className="d-logo-wrapper" style={{ marginLeft:props.ml}}>
            <div id="d-logo-text" style={{height: props.h2, width:props.w2, 
                fontSize: props.fz, backgroundColor: props.bgcolor, 
                color: props.color}}
            >
                <div style={{fontFamily: props.font}} >{props.name ? props.name : "Vũ Đình Hoàng"}</div>
            </div>
        </div>
    )
}

export default Logo;