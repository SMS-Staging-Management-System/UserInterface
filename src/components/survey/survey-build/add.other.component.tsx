import React from 'react';
import Button from 'reactstrap/lib/Button';

interface AddProps {
  parentFunction: any,
  index?: number,
  selfDestruct?: any,
  name: string
}


export class AddOther extends React.Component<AddProps, any> {
  constructor(props) {
    super(props);

  }
  // pass in function call for destroying the component and rendering a new one in its place. 
  selectType = (event) => {
    // if(this.props.selfDestruct)this.props.selfDestruct(this.props.index, event.target.value);
    let value = event.target.value;
    if (this.props.name === 'Select Question Type') {
      
      
      this.props.parentFunction(value)
    } else {
      this.props.parentFunction(value, this.props.index);
    }
  }

  render() {
    return (
      <div>
        <button type="button" className="btn rev-btn dropdown-toggle typeSelect" data-toggle="dropdown" >{this.props.name}</button>
        <div className="dropdown-menu" aria-labelledby="examples-dropdown">
          <Button type="button" 
            onClick={this.selectType} 
            value="True/False" 
            className=" dropdown-item nav-dropdown"
          >True/False</Button>
          <Button 
            type="button" 
            onClick={this.selectType} 
            value="Multiple Choice" 
            className=" dropdown-item nav-dropdown"
          >Multiple Choice</Button>
          <Button 
            type="button" 
            onClick={this.selectType} 
            value="Checkbox Multiple Answer" 
            className=" dropdown-item nav-dropdown"
          >Checkbox Multiple Answers</Button>
          <Button 
            type="button" 
            onClick={this.selectType} 
            value="Rating" 
            className=" dropdown-item nav-dropdown"
          >Rating</Button>
          <Button 
            type="button" 
            onClick={this.selectType} 
            value="Feedback" 
            className=" dropdown-item nav-dropdown"
          >Feedback</Button>
          <Button 
            type="button" 
            onClick={this.selectType} 
            value="Yes/No" 
            className=" dropdown-item nav-dropdown"
          >Yes/No</Button>
          <Button 
            type="button" 
            onClick={this.selectType} 
            value="Strongly Agree/Disagree" 
            className=" dropdown-item nav-dropdown"
          >Strongly Agree/Disagree</Button>
        </div>
      </div>

    );
  }
}


export default AddOther;