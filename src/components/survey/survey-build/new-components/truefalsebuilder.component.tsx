import React, { useState } from 'react';
import QuestionBuilder from './question.class';

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [answer, setAnswer] = useState("");
const type = "true-false";


const TrueFalseBuilder: React.FC = () => {

    return(
        <React.Fragment>
            
           <input type ="input" id="fName" onChange={(event)=> setName(event.target.value)}></input>
           <input type ="input" id="fDescription" onChange={(event)=> setDescription(event.target.value)}></input>
           <input type = "radio" id="fTrue" value="true" onClick={()=> setAnswer('True')} required></input>
           <input type = "radio" id="fFalse" value="false" onClick={()=> setAnswer('False')} required></input>
           <QuestionBuilder type={type} name={name} description={description} answer={answer}></QuestionBuilder>
        </React.Fragment>
    )
};

export default TrueFalseBuilder;