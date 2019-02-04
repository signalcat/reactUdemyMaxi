import React from 'react';

//ES6 best practice
const person = (props) => {
    // JSX syntax
    return ( 
        <div>
            <p onClick={props.click}> I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    )
};

export default person;