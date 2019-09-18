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


describe('Delete button click', () => {
    let mockProps: any;

    beforeEach(() => {
        mockProps = {
            index: 0,
            selfDestruct: jest.fn()
        }
    });

    const testArr = [1, 2, 3, 4, 5, 6, 7];

    testArr.forEach(index => {
        it('Testing delete button', () => {
            mockProps.index = index;
            const component = shallow(<DeleteButton {...mockProps} />);
            component.simulate('click');
            expect(mockProps.selfDestruct).toBeCalledWith(index)
        });
    })

});

const testArray = ['True/False', 'Multiple Choice', 'Checkbox Multiple Answer',
        'Rating', 'Feedback', 'Yes/No', 'Strongly Agree/Disagree']

describe('AddOther button click', () => {
    let mockProps: any;
    let mockEvent: any;
    beforeEach(() => {
        mockProps = {
            index: 0,
            parentFunction: jest.fn(),
            selfDestruct: jest.fn()
        };
        mockEvent = {
            target: {
                value: ''
            }
        }
    })

    
    testArray.forEach((value, index) => {
        it('Testing AddOther button', () => {
            mockProps.index = index + 1;
            const component = shallow(<AddOther {...mockProps} />);
            const buttons = component.find('div').find('div').find('Button');
            buttons.forEach(button => {
                mockEvent.target.value = value
                button.simulate('click', mockEvent);
                expect(button).toHaveLength(1);
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
            index: 0,
            parentFunction: jest.fn(),
            selfDestruct: jest.fn()
        }
        mockProps = {
            auth: {
                currentUser: {
                    email: 'abc@mail.com',
                    roles: ['ADMIN']
                }
            },
            createSurvey: jest.fn(),
            history: {
                location: {
                    state: {
                        displaySurvey: {
                            "questionJunctions": [
                                {
                                    "question": {
                                        "answers": [],
                                        "question": "Name (Optional)",
                                        "questionId": 206,
                                        "typeId": 5,

                                    }
                                },
                                {
                                    "question": {
                                        "answers": [],
                                        "question": "Email (Optional)",
                                        "questionId": 207,
                                        "typeId": 5,

                                    }
                                }
                            ]
                        }
                    }
                },
                match: null
            },
            location: null,
            match: null,
            surveyState: null
        }
        mockEvent = {
            preventDefault: jest.fn(),
            target: {
                value: ''
            }
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
        inputs.forEach(input => {
            mockEvent.target.value = 'test'
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
        const component = shallow<SurveyBuild>(<SurveyBuild {...mockProps} />);
        const inputs = component.find('textarea');
        inputs.forEach(input => {
            mockEvent.target.value = 'test textarea'
            input.simulate('change', mockEvent)
            expect(mockEvent.target.value).toEqual('test textarea')
        })
    })

    it('createSurvey function', () => {
        const component = shallow<SurveyBuild>(<SurveyBuild {...mockProps} />);
        const instance = component.instance();
        const todos = component.state('todos');
        expect(todos).toHaveLength(7);
        expect(component.state('completedTasks')).toHaveLength(2);
        instance.toAddFunction(testArray[0]);
        expect(component.state('completedTasks')).toHaveLength(3);
        instance.handleSubmit(mockEvent);
        expect(mockProps.createSurvey).toBeCalledWith([{ name: 'creator', value: mockProps.auth.currentUser.email }], component.state('completedTasks'))



    })

    const testRenderComponentArr = [{ type: 1, isRender: true }, { type: 1, isRender: false }, { type: 2, isRender: true }, { type: 2, isRender: false },
    { type: 3, isRender: false }, { type: 4, isRender: false },
    { type: 5, isRender: true }, { type: 6, isRender: false },
    { type: 7, isRender: true }, { type: 8, isRender: false }, { type: 8, isRender: true }];
    testRenderComponentArr.forEach(({ type, isRender }, index) => {
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
                    location: {
                        hash: '',
                        key: '',
                        pathname: '',
                        search: '',
                        state: undefined
                    },
                    push: jest.fn(),
                    replace: jest.fn(),

                }
            })
            if (type > 7) {
                expect(instance.renderComponent(type, index)).toBeUndefined();
            } else {
                expect(instance.renderComponent(type, index).props.index).toBe(index);
            }

        })
    })

     testArray.forEach((type) => {
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