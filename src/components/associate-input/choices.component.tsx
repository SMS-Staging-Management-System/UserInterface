import React, { PureComponent } from 'react';

interface IMultiChoiceProps {
    name: string;
    required?: boolean;
    choices: string[];
    onChange: (value: string, id: number) => void;
}

interface IQuestionState {
    count: number;
}
interface IQuestionProps {
    value: string;
}

// Multiple Choice Component ----------------------------------------------

export class MultipleChoice extends PureComponent<IMultiChoiceProps, any> {
    constructor(props: any) {
        super(props);
    }

    buildRadios = () => {
        return this.props.choices.map( (value, id) => {
            return (<label style={{ display: 'block', margin: '0', marginRight: '5px' }} key={id} className='choice-radio'> &nbsp;{value}
                <input required={this.props.required || false} style={{marginLeft: '5px'}} type="radio" name={this.props.name} value={value} onChange={e => {
                    this.props.onChange(e.target.value, id);
                }} />
                <span className='checkmark'></span>
            </label> );
        });
    };

    render() {
        return ( <>{this.buildRadios()}</> );
    }
}

// Dropdown Component ----------------------------------------------

export class Dropdown extends PureComponent<IMultiChoiceProps, any> {
    constructor(props: any) {
        super(props);
    }

    buildDropdown = () => {
        const { name, required } = this.props;
        return (
            <select required={required || false} className='container' name={name} id={name} onChange={e => {
                this.props.onChange(e.target.value, e.target.selectedIndex);
            }} >
                {this.props.choices.map((e, i) => {
                    return (<option key={i} value={e}>{e}</option>);
                })}
            </select>
        );
    };

    render() {
        return (<>{this.buildDropdown()}</>);
    }
}

// Question Component ----------------------------------------------

export class Question extends PureComponent<IQuestionProps, IQuestionState> {
    constructor(props: any) {
        super(props);
    }

    

    render() {
        return (
            <div style={{marginBottom: '10px'}} className='question'>
                <p style={{margin: '0'}} >{this.props.value}</p>
                {this.props.children}
            </div>
        );
    }
}

