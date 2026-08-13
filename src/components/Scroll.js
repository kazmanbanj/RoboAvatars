import React from 'react';

const Scroll = (props) => {
  return (
    <div
      className="br3"
      style={{
        border: '7px solid black',
        height: '75vh',
        overflowY: 'auto',
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
