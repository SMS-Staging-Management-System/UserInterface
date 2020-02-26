import React from 'react';
import AgreeDisagreeBuilder from './agreedisagreebuilder.component';
import MultipleChoiceBuilder from './multiplechoicebuilder.component';
import RatingBuilder from './ratingbuilder.component';
import TrueFalseBuilder from './truefalsebuilder.component';
import YesNoMaybeBuilder from './yesnomaybebuilder.component';
import AgreeDisplay from './agreedisplay.component';
import MultiDisplay from './multipledisplay.component';
import RatingDisplay from './ratingdisplay.component';
import TrueFalseDisplay from './truefalsedisplay.component';
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
            return <AgreeDisplay type={props.type}> name={props.name} answer={props.answer} description={props.description}></AgreeDisplay>
        case 'multiple-choice':
            return <MultipleChoiceBuilder></MultipleChoiceBuilder>
        case 'multiple-display':
            return <MultiDisplay type={props.type}> name={props.name} answer={props.answer} description={props.description}></MultiDisplay>    
        case 'rating':
            return <RatingBuilder></RatingBuilder>
        case 'rating-display':
            return <RatingDisplay type={props.type}> name={props.name} answer={props.answer} description={props.description}></RatingDisplay>
        case 'true-false':
            return <TrueFalseBuilder></TrueFalseBuilder>
        case 'truefalse-display':
            return <TrueFalseDisplay type={props.type}> name={props.name} answer={props.answer} description={props.description}></TrueFalseDisplay>
        case 'yesnomaybe':
            return <YesNoMaybeBuilder></YesNoMaybeBuilder>
        case 'yesnomaybe-display':
            return <YesNoMaybeDisplay type={props.type}> name={props.name} answer={props.answer} description={props.description}></YesNoMaybeDisplay>
        default:
            return null;
    }
    
}

export default QuestionBuilder;
