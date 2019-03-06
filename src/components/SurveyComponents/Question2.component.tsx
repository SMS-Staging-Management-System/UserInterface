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


export class Question2 extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);
 
   this.state={ inputs2: []}

}


//   handleChange = (event) => { 

//   }

  addQuestion2 = () => {

    this.setState({
      inputs2: this.state.inputs2.concat([{ input: "" }])
    });
  }
  removeQuestion2 = () => {


      let userInput =this.state.inputs2
      userInput.pop();
     this.setState({
      inputs2: userInput
    });
  };



  render() {
    
    return (

    <div>
<button value="2" id="yn" className="form-control" name="type"  > Yes/No  </button>
           {this.state.inputs2.map((inputs) => (
              
          <div className="new" id="t2">
         
             <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '500px' }}   ></input>
                <input name="answerText" value="Yes, No, Maybe" readOnly hidden /> 
         </div>
        ))}
        <div className="yuay">
        
        <button type="button" onClick={this.addQuestion2} className="btn btn-primary" ><span>&#65291;</span></button> &nbsp;&nbsp;<button type="button" onClick={() => this.removeQuestion2()} className="btn btn-primary" ><span>&#8722;</span> </button>
</div>

<br></br>
    </div> 

    );
  }
}


export default Question2;