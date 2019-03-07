import React from 'react';

export interface ISurveyBuildProps {
//   user: IUserState,
//   surveyTitle: string,
//   type: string,
//   errorMessage: string,
//   newSurvey: {},
//   handleSubmit(newSurvey: {}, userId: number): void
}


export class Question5 extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);
 
   this.state={ inputs5: []}

}


//   handleChange = (event) => { 

//   }

  addQuestion5 = () => {

    this.setState({
      inputs5: this.state.inputs5.concat([{ input: "" }])
    });
  }
  removeQuestion5 = () => {


      let userInput =this.state.inputs5
      userInput.pop();
     this.setState({
      inputs5: userInput
    });
  };



  render() {
    
    return (

    <div>

<button value="5" id="feedback" className="form-control" name="type" >Feedback</button>
      
      {this.state.inputs5.map((inputs) => (
  <div className="new" id="t5">
  
   <input name="questionText" type="text" placeholder="Question Title (i.e. Please give your feedback)" style={{ width: '500px'}}    >
   </input> 
   
     </div>
))}
<div className="yuay">
<button type="button" className="btn btn-primary" onClick={this.addQuestion5} ><span>&#65291;</span> </button> &nbsp;&nbsp;<button type="button" onClick={() => this.removeQuestion5()} className="btn btn-primary" ><span>&#8722;</span> </button><br></br>
</div>
    </div> 

    );
  }
}


export default Question5;