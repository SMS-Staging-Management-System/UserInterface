import React from 'react';
import { shallow, mount } from 'enzyme';
import YesNoMaybe from '../yes_no_question.component';
import TrueFalse from '../truefalse.component';
import StronglyAgree from '../stronglyAgree.component';
import Rating from '../Rating.component';
import MultipleChoice from '../multiplechoice.component';
import FeedBack from '../feedback.component';
import CheckBox from '../checkbox.component';
import { DeleteButton } from '../delete.component';
import AddOther from '../add.other.component';
import { SurveyBuild } from '../survey-build.component';


describe('Base Test Rendering For Question Types', () => {
    //--------------------TEST 1------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox />);
        expect(component).resolves;
    });
    //--------------------TEST 2------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox />);
        expect(component).resolves;
    });
    //--------------------TEST 3------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox />);
        expect(component).resolves;
    });
});

describe('Question Given Test Rendering For Question Types', () => {

    //--------------------TEST 1------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Are You Intelligent?"} />);
        expect(component).resolves;
    });

    //--------------------TEST 2------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Is your name Joe too?"} />);
        expect(component).resolves;
    });

    //--------------------TEST 3------------------------------
    it('Testing Basic Rendition of Yes/No', () => {
        const component = shallow(<YesNoMaybe defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of True/False', () => {
        const component = shallow(<TrueFalse defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Agree/Disagree', () => {
        const component = shallow(<StronglyAgree defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of Rating', () => {
        const component = shallow(<Rating defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of FeedBack', () => {
        const component = shallow(<FeedBack defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"How Are You Intelligent Then?"} />);
        expect(component).resolves;
    });
});
describe('Answers Given Test Rendering For Question Types', () => {
    //--------------------TEST 1------------------------------
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultAnswer={"No, Yes"} />);
        expect(component).resolves;
    });

    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"No, Yes"} />);
        expect(component).resolves;
    });

    //--------------------TEST 2------------------------------
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultAnswer={"Could, Should"} />);
        expect(component).resolves;
    });

    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Could, Should"} />);
        expect(component).resolves;
    });

    //--------------------TEST 3------------------------------
    it('Testing Basic Rendition of MultiChoice', () => {
        const component = shallow(<MultipleChoice defaultAnswer={"Will, Will not"} />);
        expect(component).resolves;
    });

    it('Testing Basic Rendition of CheckBox', () => {
        const component = shallow(<CheckBox defaultQuestion={"Will, Will not"} />);
        expect(component).resolves;
    });
});

describe('Delete button click', () => {
    let mockProps: any;

    beforeEach(() => {
        mockProps = {
            selfDestruct: jest.fn(),
            index: 0
        }
    });

    let testArr = [1, 2, 3, 4, 5, 6, 7];

    testArr.forEach(index => {
        it('Testing delete button', () => {
            mockProps.index = index;
            const component = shallow(<DeleteButton {...mockProps} />);
            component.simulate('click');
            expect(mockProps.selfDestruct).toBeCalledWith(index)
        });
    })

});

describe('AddOther button click', () => {
    let mockProps: any;
    let mockEvent: any;
    beforeEach(() => {
        mockProps = {
            parentFunction: jest.fn(),
            selfDestruct: jest.fn(),
            index: 0
        };
        mockEvent = {
            target: {
                value: ''
            }
        }
    })

    let testArr = [[1, 'True/False'], [2, 'Multiple Choice'], [3, 'Checkbox Multiple Answer'],
    [4, 'Rating'], [5, 'Feedback'], [6, 'Yes/No'], [7, 'Strongly Agree/Disagree']]

    testArr.forEach(([index, value]) => {
        it('Testing AddOther button', () => {
            mockProps.index = index;
            const component = shallow(<AddOther {...mockProps} />);
            const buttons = component.find('div').find('div').find('Button');
            buttons.forEach(button => {
                mockEvent.target.value = value
                button.simulate('click', mockEvent);
                expect(button).toHaveLength(1);
                expect(mockProps.selfDestruct).toBeCalledWith(index);
                expect(mockProps.parentFunction).toBeCalledWith(value);
            })
        })
    })


});

describe('Survey Build Component rendering', () => {
    let mockProps: any;
    let mockEvent: any;
    let mockPropsComponent: any;
    beforeEach(() => {
        mockPropsComponent = {
            selfDestruct: jest.fn(),
            index: 0,
            parentFunction: jest.fn()
        },
            mockProps = {
                auth: {
                    currentUser: {
                        email: 'abc@mail.com',
                        roles: ['ADMIN']
                    }
                },
                match: null,
                location: null,
                history: {
                    location: {
                        state: {
                            displaySurvey: {
                                "questionJunctions": [
                                    {
                                        "question": {
                                            "questionId": 206,
                                            "question": "Name (Optional)",
                                            "typeId": 5,
                                            "answers": []
                                        }
                                    },
                                    {
                                        "question": {
                                            "questionId": 207,
                                            "question": "Email (Optional)",
                                            "typeId": 5,
                                            "answers": []
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    match: null
                },
                surveyState: null,
                createSurvey: jest.fn()
            },
            mockEvent = {
                target: {
                    value: ''
                },
                preventDefault: jest.fn()
            }
    })

    it('Submit button preventDefault value change', () => {
        const component = shallow(<SurveyBuild {...mockProps} />);
        let prevented = false
        component.find('form').simulate('submit', {
            preventDefault: () => {
                prevented = true
            }
        });
        expect(prevented).toBe(true);
    })

    it('Input value', () => {
        const component = shallow(<SurveyBuild {...mockProps} />);
        const inputs = component.find('input');
        // expect(inputs).toHaveLength(2);
        inputs.forEach(input => {
            mockEvent.target.value = 'test'
            input.simulate('focus')
            input.simulate('change', mockEvent)
            expect(mockEvent.target.value).toBe('test')
        })
    })

    it('createSurvey function', () => {
        const component = shallow(<SurveyBuild {...mockProps} />);
        const submit = component.find('form').find('button');
        submit.forEach(button => {
            if (button.type() === 'submit') {
                button.simulate('click');
                expect(mockProps.createSurvey).toBeCalledTimes(1);
            }
        })
    })

    it('textarea value', () => {
        const component = shallow(<SurveyBuild {...mockProps} />);
        const inputs = component.find('textarea');
        // expect(inputs).toHaveLength(2);
        inputs.forEach(input => {
            mockEvent.target.value = 'test textarea'
            input.simulate('focus')
            input.simulate('change', mockEvent)
            expect(mockEvent.target.value).toBe('test textarea')
        })
    })

    it('createSurvey function', () => {
        const component = shallow<SurveyBuild>(<SurveyBuild {...mockProps} />);
        const instance = component.instance();
        const todos = component.state('todos');
        expect(todos).toHaveLength(7);
        expect(component.state('completedTasks')).toHaveLength(2);
        instance.toAddFunction("True/False");
        expect(component.state('completedTasks')).toHaveLength(3);
        instance.handleSubmit(mockEvent);
        expect(mockProps.createSurvey).toBeCalledWith([{ name: 'creator', value: mockProps.auth.currentUser.email }], component.state('completedTasks'))



    })

    let testArr = [{type:1,isRender: true},{type:1,isRender: false}, {type:2,isRender: true}, {type:2,isRender: false},
        {type:3,isRender: false},{type:4,isRender: false},
        {type:5,isRender: true},{type:6,isRender: false},
        {type:7,isRender: true},{type:8,isRender: false},{type:8,isRender: true}];
    testArr.forEach(({type, isRender}, index) => {
        it('renderComponent function', () => {
            const component = shallow<SurveyBuild>(<SurveyBuild {...mockProps} />);
            const instance = component.instance();
            instance.setState({
                notRenderedFirstTime: isRender
            })
            mockPropsComponent.index = index;
            if (type > 7) {
                expect(instance.renderComponent(type, index)).toBeUndefined();
            } else {
                expect(instance.renderComponent(type, index).props.index).toBe(index);
            }

            component.setProps({
                history: {
                    action: 'PUSH',
                    block: jest.fn(),
                    createHref: jest.fn(),
                    go: jest.fn(),
                    goBack: jest.fn(),
                    goForward: jest.fn(),
                    length: 0,
                    listen: jest.fn(),
                    push: jest.fn(),
                    replace: jest.fn(),
                    location: {
                        hash: '',
                        key: '',
                        pathname: '',
                        search: '',
                        state: undefined
                    }
                }
            })
            if (type > 7) {
                expect(instance.renderComponent(type, index)).toBeUndefined();
            } else {
                expect(instance.renderComponent(type, index).props.index).toBe(index);
            }

        })
    })

    let testToAddArr = ["True/False", "Multiple Choice", "Checkbox Multiple Answer", "Rating", "Feedback", "Yes/No", "Strongly Agree/Disagree"];
    testToAddArr.forEach((type) => {
        it('toAddFunction testing', () => {
            const component = shallow<SurveyBuild>(<SurveyBuild {...mockProps} />);
            const instance = component.instance();
            instance.toAddFunction(type);
            expect(component.state('completedTasks')).toHaveLength(3);

            instance.deleteRow(0);
            instance.deleteRow(0);
            instance.deleteRow(0);
            expect(component.state('completedTasks')).toEqual([]);
        })
    })


    it('addSpecificSurvey function testing', () => {
        const component = shallow<SurveyBuild>(<SurveyBuild {...mockProps} />);
        const instance = component.instance();
        expect(component.state('completedTasks')).toHaveLength(2);
        instance.addSpecificSurvey();
        expect(component.state('completedTasks')).toHaveLength(2);
    })



})