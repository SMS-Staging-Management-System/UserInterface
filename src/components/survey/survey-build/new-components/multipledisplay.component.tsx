import React, { useState } from 'react';

interface displayProps{
    name: string;
    description: string;
    answer: string;
}



const MultiDisplay: React.FC<displayProps> = (props) => {

    return(
        <React.Fragment>
            <h3>{props.name}</h3>
            <h3>{props.description}</h3>
            <h3>{props.answer}</h3>
           
        </React.Fragment>
    )
};

export default MultiDisplay;