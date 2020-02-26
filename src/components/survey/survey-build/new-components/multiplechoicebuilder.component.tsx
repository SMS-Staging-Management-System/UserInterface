import React, { useState } from 'react';
import QuestionBuilder from './question.class';

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [answer, setAnswer] = useState("");
const type = "multiple-choice";


const MultipleChoiceBuilder: React.FC = () => {

    return(
        <React.Fragment>
            
           <input type ="input" id="fName" onChange={(event)=> setName(event.target.value)}></input>
           <input type ="input" id="fDescription" onChange={(event)=> setDescription(event.target.value)}></input>
           <input type ="input" id="fAnswer" onChange={(event)=> setAnswer(event.target.value)}></input>
           
           <QuestionBuilder type={type} name={name} description={description} answer={answer}></QuestionBuilder>
        </React.Fragment>
    )
};

export default MultipleChoiceBuilder;