import React, { PureComponent } from 'react';

interface IMultiChoiceProps {
    name: string;
    choices: string[];
    onChange: (value: string, id: number) => void;
}

export class MultipleChoice extends PureComponent<IMultiChoiceProps, any> {
    constructor(props: any) {
        super(props);
    }

    buildRadios = () => {
        return this.props.choices.map( (value, id) => {
            console.log(id);
            return (<label key={id} className='choice-radio'>{value}
                <input type="radio" name={this.props.name} value={value} onChange={e => {
                    this.props.onChange(e.target.value, id);
                }} />
                <span className='checkmark'></span>
            </label>);
        });
    };

    render() {
        return (<>{this.buildRadios()}</>);
    }
}

export class Dropdown extends PureComponent<IMultiChoiceProps, any> {
    constructor(props: any) {
        super(props);
    }

    buildDropdown = () => {
        const { name, onChange } = this.props;
        return (
            <select className='container' name={name} id={name} onChange={e => {
                onChange(e.target.value, e.target.selectedIndex);
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