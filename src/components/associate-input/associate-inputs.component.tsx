import React, { Component } from 'react';;
import { Redirect } from 'react-router-dom'
import { Question, MultipleChoice, Dropdown } from './choices.component';
import { IAssociateInput } from '../../model/Associateinput.model';
import * as actions from '../../actions/assoc-input/assoc-input.action';
import { connect } from 'react-redux';
import { getFormatNames } from './temp.util';
import { IState } from '../../reducers';
import Button from 'reactstrap/lib/Button';

interface IProps {
    fields: IAssociateInput;
    updateDayNotified: (event: any) => void;
    updateDescProvided: (value: string, id: number) => void;
    updateActualFormat: (value: string, id: number) => void;
    updateProposedFormat: (value: string, id: number) => void;
    submitInput: (interviewId: number, fields: IAssociateInput) => void;
    ownProps: any;
}

interface IInputState {
    error: boolean;
    redirect: boolean;
}

export class AssociateInput extends Component<IProps, IInputState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: false,
            redirect: false
        };
        
    }

    toDateString = (): string => {
        var local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    };

    toggleError = () => {
        this.setState({
            ...this.state,
            error: true
        });
    };

    toggleRedirect = () => {
        this.setState({
            ...this.state,
            redirect: true
        });
    };

    drawError = () => {
        if(this.state.error) {
            return (
                <p style={{color: 'red'}}>*All Fields Required</p>
            );
        }
        return (<></>);
    };

    drawRedirect = () => {
        if(this.state.redirect) {
            return (<Redirect to='/interview/list' />);
        }
        return (<></>);
    };

    validate = () => {
        for(let prop in this.props.fields) {
            if(this.props.fields[prop] === undefined) {
                return false;
            }
        }
        return true;
    };

    render() {
        const {
            fields,
            updateDayNotified,
            updateDescProvided,
            updateActualFormat,
            updateProposedFormat,
            submitInput
        } = this.props;
        
        const {interviewId} = this.props.ownProps.location.state;

        return (
            <form style={{
                padding: '1rem',
                backgroundColor: 'rgb(255,194,137)'
            }}>
                <Question value='When did you recieve a notification?' >
                    <input className='tab-once' type="date" onChange={updateDayNotified} />
                </Question>
                <Question value='Were you provided a job description?' >
                    <MultipleChoice name='q3' choices={['Yes', 'No']} onChange={updateDescProvided} />
                </Question>

                <Question value='What was the proposed interview format?' >
                    <Dropdown name='q4' choices={getFormatNames()} onChange={updateProposedFormat} />
                </Question>

                <Question value='What was the actual interview format?'>
                    <Dropdown name='q5' choices={getFormatNames()} onChange={updateActualFormat} />
                </Question>

                {this.drawError()}

                <Button color="secondary" size="sm" block onClick={(e) => {
                    this.toggleRedirect();
                }}>Back</Button>

                <Button color="secondary" size="lg" block onClick={(e) => {
                    e.preventDefault();
                    if (this.validate()) {
                        submitInput(interviewId, fields);
                        this.toggleRedirect();
                    } else {
                        this.toggleError();
                    }
                }}>SUBMIT</Button>

                {this.drawRedirect()}
            </form>
        );
    }
}

const mapStateToProps = (state: IState, ownProps) => {
    return {
        ownProps: ownProps,
        fields: state.interviewState.associateInput
    };
};

const mapDispatchToProps = { 
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(AssociateInput);