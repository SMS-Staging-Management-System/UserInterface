import React, { useState } from 'react';
import QuestionBuilder from './question.class';


const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [answer, setAnswer] = useState("");
const type = "agree-disagree";


const AgreeDisagreeBuilder: React.FC = () => {

    return(
        <React.Fragment>
            
           <input type ="input" id="fName" onChange={(event)=> setName(event.target.value)} required></input>
           <input type ="input" id="fDescription" onChange={(event)=> setDescription(event.target.value)} required></input>
           <input type = "radio" id="fAgree" value="agree" onClick={()=> setAnswer('Agree')} required></input>
           <input type = "radio" id="fDisagree" value="agree" onClick={()=> setAnswer('Disagree')} required></input>
           <QuestionBuilder type={type}> name={name} answer={answer} description={description}</QuestionBuilder>
        </React.Fragment>
    )
};

export default AgreeDisagreeBuilder;