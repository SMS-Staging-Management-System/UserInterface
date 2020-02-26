import React, { useState } from 'react';
import QuestionBuilder from './question.class';

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [answer, setAnswer] = useState("");
const type = "yesnomaybe";


const YesNoMaybeBuilder: React.FC = () => {

    return(
        <React.Fragment>
            
           <input type ="input" id="fName" onChange={(event)=> setName(event.target.value)}></input>
           <input type ="input" id="fDescription" onChange={(event)=> setDescription(event.target.value)}></input>
           <input type = "radio" id="fYes" value="Yes" onClick={()=> setAnswer('Yes')} required></input>
           <input type = "radio" id="fNo" value="No" onClick={()=> setAnswer('No')} required></input>
           <input type = "radio" id="fMaybe" value="Maybe" onClick={()=> setAnswer('Maybe')} required></input>
           <QuestionBuilder type={type}> name={name} answer={answer} description={description}></QuestionBuilder>
        </React.Fragment>
    )
};

export default YesNoMaybeBuilder;