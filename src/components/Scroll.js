import React from 'react'

const Scroll = (props) => {
    return (
        <div class="br3 overflow-y-scroll-l b--black-90" style={{border: '7px solid black', height: 'auto', overflow: 'hidden'}}>
            {props.children}
        </div>
    )
}

export default Scroll;