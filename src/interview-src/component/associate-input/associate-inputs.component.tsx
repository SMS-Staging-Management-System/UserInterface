import React, { Component } from 'react';
import { IAssociateInput } from './interview-interfaces';
import { MultipleChoice, Dropdown } from './choices.component';
import './radio.style.css';

interface IProps {
    fields?: IAssociateInput;
}

export class AssociateInputComponent extends Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    toDateString = () => {
        var local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    };

    testLog = (e: string, i: number) => {
        console.log(`${i}: ${e}`);
    };

    render() {
        return (
            <form id='assoc-questionaire'>
                <div className='question'>
                    <p>1. When did you recieve a notification?</p>
                    <input className='tab-once' value={this.toDateString()} type="date" onChange={e => {
                        console.log(typeof (e.target.valueAsDate));
                    }} />
                </div>

                <div className='question'>
                    <p>2. Did you recieve more than a 24-hour notice?</p>
                    <MultipleChoice {...{
                        name: 'test1',
                        choices: ['Yes', 'No'],
                        onChange: this.testLog
                    }} />
                </div>

                <div className='question'>
                    <p>3. Were you provided a job description?</p>
                    <MultipleChoice {...{
                        name: 'test2',
                        choices: ['Yes', 'No'],
                        onChange: this.testLog
                    }} />
                </div>

                <div className='question'>
                    <p>4. What was the proposed interview format?</p>
                    <Dropdown {...{
                        name: 'propose-interview',
                        choices: ['Video Call', 'Phone', 'In Person'],
                        onChange: this.testLog
                    }} />
                </div>

                <div className='question'>
                    <p>5. What was the actual interview format?</p>
                    <Dropdown {...{
                        name: 'actual-interview',
                        choices: ['Video Call', 'Phone', 'In Person'],
                        onChange: this.testLog
                    }} />
                </div>
            </form>
        );
    }
}