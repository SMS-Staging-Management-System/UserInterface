import React from 'react';
import AgreeDisagreeBuilder from './agreedisagreebuilder.component';
import MultipleChoiceBuilder from './multiplechoicebuilder.component';
import RatingBuilder from './ratingbuilder.component';
import TrueFalseBuilder from './truefalsebuilder.component';
import YesNoMaybeBuilder from './yesnomaybebuilder.component';
import AgreeDisplay from './agreedisplay.component';
import MultiDisplay from './multipledisplay.component';
import RatingDisplay from './ratingdisplay.component';
import TrueFalseDisplay from './trueFalsedisplay.component';
import YesNoMaybeDisplay from './yesnomaybedisplay.component';



export interface QuestionProps{
    type: string;
    name: string;
    description: string;
    answer: string;

}

const QuestionBuilder: React.FC<QuestionProps> = (props) => {
    switch(props.type) {
        case 'agree-disagree':
            return <AgreeDisagreeBuilder></AgreeDisagreeBuilder>
        case 'agree-display':
            return <AgreeDisplay name={props.name} description ={props.description} answer={props.answer}></AgreeDisplay>
        case 'multiple-choice':
            return <MultipleChoiceBuilder></MultipleChoiceBuilder>
        case 'multiple-display':
            return <MultiDisplay name={props.name} description ={props.description} answer={props.answer}></MultiDisplay>
        case 'rating':
            return <RatingBuilder></RatingBuilder>
        case 'rating-display':
            return <RatingDisplay name={props.name} description ={props.description} answer={props.answer}></RatingDisplay> 
        case 'true-false':
            return <TrueFalseBuilder></TrueFalseBuilder>
        case 'truefalse-display':
            return <TrueFalseDisplay name={props.name} description ={props.description} answer={props.answer}></TrueFalseDisplay>    
        case 'yesnomaybe':
            return <YesNoMaybeBuilder></YesNoMaybeBuilder>
        case 'yesnomaybedisplay':
            return <YesNoMaybeDisplay name={props.name} description ={props.description} answer={props.answer}></YesNoMaybeDisplay>
        default:
            return null;
    }
    
}

export default QuestionBuilder;
