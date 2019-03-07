import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from "jquery";
//import { IUserState, state } from '../../reducers';
import Question1 from '../survey-build/question1.component'


export interface ISurveyBuildProps {
  //user: IUserState,
  surveyTitle: string,
  type: string,
  errorMessage: string,
  newSurvey: {},
  handleSubmit(newSurvey: {}, userId: number): void
}

export class SurveyBuildComponent extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);
    //this.state = {
  //    redirectTo: null
  //  }
   this.state={
     inputs1: [],
     inputs2: [],
     inputs3: [],
     inputs4: [],
     inputs5: []

  }

}


  handleChange = (event) => { 

  }

  setVisibility = (ok, box) => {
    let id = $(ok).val()

    if (id == 1) {
      // Show the hidden fields.

      $("#t1").toggle();
      // Populate the input.
    }

    if (id == 2) {
      // Show the hidden fields.
      $("#t2").toggle();
      // Populate the input.
    }

    if (id == 3) {
      // Show the hidden fields.
      $("#t3").toggle();
      // Populate the input.
    }
  
    if (id == 4) {
      // Show the hidden fields.
      $("#t4").toggle();
      // Populate the input.
    }

    if (id == 5) {
      // Show the hidden fields.
      $("#t5").toggle();
      // Populate the input.
    }
  

  }
  addQuestion1 = () => {

    this.setState({
      inputs1: this.state.inputs1.concat([{ input: "" }])
    });


  };
  addQuestion2 = () => {
    this.setState({
      inputs2: this.state.inputs2.concat([{ input: "" }])
    });
  };
  addQuestion3 = () => {
    this.setState({
      inputs3: this.state.inputs3.concat([{ input: "" }])
    });
  };
  addQuestion4 = () => {
    this.setState({
      inputs4: this.state.inputs4.concat([{ input: "" }])
    });
  };
  addQuestion5 = () => {
    this.setState({
      inputs5: this.state.inputs5.concat([{ input: "" }])
    });
  };

  removeQuestion1 = () => {


      let userInput =this.state.inputs1
      userInput.pop();
     this.setState({
      inputs1: userInput
    });
  };
  removeQuestion2 = () => {


    let userInput =this.state.inputs2
    userInput.pop();
   this.setState({
    inputs2: userInput
  });
};
removeQuestion3= () => {


  let userInput =this.state.inputs3
  userInput.pop();
 this.setState({
  inputs3: userInput
});
};
removeQuestion4 = () => {


  let userInput =this.state.inputs4
  userInput.pop();
 this.setState({
  inputs4: userInput
});
};
removeQuestion5 = () => {


  let userInput =this.state.inputs5
  userInput.pop();
 this.setState({
  inputs5: userInput
});
};




  handleSubmit = async (event) => {
    event.preventDefault();
    var frmData = $(":input").serializeArray();
    console.log(frmData);
    // We need to the id of the loggedIn user
  //  await this.props.handleSubmit(frmData, this.props.user.userId);
  // this.setState({ redirectTo: '/home' })
  }

  render() {
     if (this.state.redirectTo) {
     return <Redirect push to={this.state.redirectTo} />
     }
    
    return (

      <div className="container create-survey-container" >
        <div className="jumbotron">
          <form onSubmit={this.handleSubmit}>
            <div id="123d" className={'form-group'}>
              <label htmlFor="title">Survey Title</label>
              <input type="title" className="form-control" name="title" required /><br />

              <label htmlFor="description">Survey Description</label>
              <textarea className="form-control" name="description" placeholder="Survey Description" required></textarea><br />

              <label htmlFor="surveyPrivacy">Survey Privacy</label><br />
              <div className="row">
                <div className="col">
                  <label><input className="form-check" type="radio" name="privacy" value="2" /> Private Survey</label>
                </div>
                <div className="col">
                  <label><input className="form-check" type="radio" name="privacy" value="1" defaultChecked /> Open Survey</label><br /><br />
                </div>
              </div>


              <label htmlFor="type">Add Question Types</label><br />

           <Question1/>





              <div className="form-group">
                <br /><br /><button type="submit" className="btn btn-primary">Create Survey</button>
                <a href="http://pdf-ace.com/pdfme"  target="http://localhost:3000/create"><img alt="Save as PDF" height="27" src="

             " width="120" /></a>


                <Link to="/home" className="btn btn-link">Cancel</Link>
              </div>
            </div>
          </form>
          <p>{this.props.errorMessage}</p>
        </div>
      </div>
    );
  }
}


export default SurveyBuildComponent;