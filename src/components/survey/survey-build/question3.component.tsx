import React from 'react';




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

  
  }


  //   handleChange = (event) => { 

  //   }

 


  render() {

    return (

      <div>
        <button value="3" id="agree" className="form-control" name="type" > Strongly Agree-Strongly Disagree  </button>
          <div className="new" id="t3">
         
            <input name="questionText" type="text" placeholder="Question Title (i.e. Product is easy to use )" style={{ width: '500px' }}   ></input>
                <input name="answerText" value="Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree" readOnly hidden />
                
         </div>
       

<br></br>

      </div>

    );
  }
}


export default Question3;