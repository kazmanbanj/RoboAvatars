import React from 'react'

const Scroll = (props) => {
    return (
        <div class="br3 overflow-y-scroll-l b--black-90" style={{border: '7px solid black', height: '800px'}}>
            {props.children}
        </div>
    )
}

export default Scroll;