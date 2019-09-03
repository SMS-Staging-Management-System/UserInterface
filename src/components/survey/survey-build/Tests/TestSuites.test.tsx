import React from 'react';
import { shallow } from 'enzyme';
import YesNoMaybe from '../yes_no_question.component';
import TrueFalse from '../truefalse.component';
import StronglyAgree from '../stronglyAgree.component';
import Rating from '../Rating.component';
import MultipleChoice from '../multiplechoice.component';
import FeedBack from '../feedback.component';
import CheckBox from '../checkbox.component';

describe('Base Test Rendering For Question Types', () => {
    //--------------------TEST 1------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox/>);
        expect(component).resolves;
    });
    //--------------------TEST 2------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox/>);
        expect(component).resolves;
    });
    //--------------------TEST 3------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox/>);
        expect(component).resolves;
    });
});
describe('Question Given Test Rendering For Question Types', () => {
    
    //--------------------TEST 1------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Are You Intelligent?"}/>);
        expect(component).resolves;
    });
    //--------------------TEST 2------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Is your name Joe too?"}/>);
        expect(component).resolves;
    });
    //--------------------TEST 3------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"How Are You Intelligent Then?"}/>);
        expect(component).resolves;
    });
});
describe('Answers Given Test Rendering For Question Types', () => {
    //--------------------TEST 1------------------------------
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultAnswer={"No, Yes"}/>);
        expect(component).resolves;
    });
    
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"No, Yes"}/>);
        expect(component).resolves;
    });
    //--------------------TEST 2------------------------------
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultAnswer={"Could, Should"}/>);
        expect(component).resolves;
    });
    
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Could, Should"}/>);
        expect(component).resolves;
    });
    //--------------------TEST 3------------------------------
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultAnswer={"Will, Will not"}/>);
        expect(component).resolves;
    });
    
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Will, Will not"}/>);
        expect(component).resolves;
    });
});