import React, { useState } from 'react';
import QuestionBuilder from './question.class';

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [answer, setAnswer] = useState("");
const type = "rating";


const RatingBuilder: React.FC = () => {

    return(
        <React.Fragment>
            
           <input type ="input" id="fName" onChange={(event)=> setName(event.target.value)}></input>
           <input type ="input" id="fDescription" onChange={(event)=> setDescription(event.target.value)}></input>
           <input type = "radio" id="fOne" value="1" onClick={()=> setAnswer('1')} required></input>
           <input type = "radio" id="fTwo" value="2" onClick={()=> setAnswer('2')} required></input>
           <input type = "radio" id="fThree" value="3" onClick={()=> setAnswer('3')} required></input>
           <input type = "radio" id="fFour" value="4" onClick={()=> setAnswer('4')} required></input>
           <input type = "radio" id="fFive" value="5" onClick={()=> setAnswer('5')} required></input>
           <QuestionBuilder type={type} name={name} description={description} answer={answer}></QuestionBuilder>
        </React.Fragment>
    )
};

export default RatingBuilder;