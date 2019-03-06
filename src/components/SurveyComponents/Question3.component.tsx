import React from 'react';

const ReactDOM = require('react-dom')



export interface ISurveyBuildProps {
//   user: IUserState,
//   surveyTitle: string,
//   type: string,
//   errorMessage: string,
//   newSurvey: {},
//   handleSubmit(newSurvey: {}, userId: number): void
}


export class Question3 extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);
 
   this.state={ inputs3: []}

}


//   handleChange = (event) => { 

//   }

  addQuestion3 = () => {

    this.setState({
      inputs3: this.state.inputs3.concat([{ input: "" }])
    });
  }
  removeQuestion3 = () => {


      let userInput =this.state.inputs3
      userInput.pop();
     this.setState({
      inputs3: userInput
    });
  };



  render() {
    
    return (

    <div> 
          <button value="3" id="agree" className="form-control" name="type"  > Strongly Agree-Strongly Disagree  </button>
    {this.state.inputs3.map((inputs) => (
       <div className="new" id="t3">
      
         <input name="questionText" type="text" placeholder="Question Title (i.e. Product is easy to use )" style={{ width: '500px' }}   ></input>
             <input name="answerText" value="Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree" readOnly hidden />
             
      </div>
     ))}
     <div className="yuay">
     <button type="button" onClick={this.addQuestion3}className="btn btn-primary" ><span>&#65291;</span> </button> &nbsp;&nbsp;<button type="button" onClick={() => this.removeQuestion3()} className="btn btn-primary" ><span>&#8722;</span> </button>
</div>

<br></br>


    </div> 

    );
  }
}


export default Question3;