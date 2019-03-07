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

  }


  //   handleChange = (event) => { 

  //   }





  render() {

    return (

      <div>

        <button value="5" id="feedback" className="form-control" name="type" >Feedback</button>

          <div className="new" id="t5">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Please give your feedback)" style={{ width: '100%' }}    >
            </input>

          </div>
          <hr/>
      </div>

    );
  }
}


export default Question5;