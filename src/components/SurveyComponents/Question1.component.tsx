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


export class Question1 extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);
 
   this.state={ inputs1: []}

}


//   handleChange = (event) => { 

//   }

  addQuestion1 = () => {

    this.setState({
      inputs1: this.state.inputs1.concat([{ input: "" }])
    });
  }
  removeQuestion1 = () => {


      let userInput =this.state.inputs1
      userInput.pop();
     this.setState({
      inputs1: userInput
    });
  };



  render() {
    
    return (

    <div>
 <button value="1" id="multi"  className="form-control" name="type" type="button"   > Multiple Chioce </button>

{this.state.inputs1.map((inputs) => (
<div className="new"  id="t1">

  <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ width: '500px' }}   ></input>
    <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ width: '500px' }}   ></input>
    
  </div>
))}
<div className="yuay">

<button type="button" onClick={this.addQuestion1}className="btn btn-primary" ><span>&#65291;</span> </button>  &nbsp;&nbsp;<button type="button" onClick={() => this.removeQuestion1()}className="btn btn-primary" ><span>&#8722;</span></button>

</div>
<br></br>
    </div> 

    );
  }
}


export default Question1;