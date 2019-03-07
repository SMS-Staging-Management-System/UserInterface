import React from 'react';




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

   

  }


  //   handleChange = (event) => { 

  //   }



  render() {

    return (

      <div>
        <button value="1" id="multi" className="form-control" name="type" type="button"   > Multiple Chioce </button>

     
          <div className="new" id="t1">

            <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ width: '500px' }}   ></input>
            <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ width: '500px' }}   ></input>

          </div>
   
        <div className="yuay">

        </div>
        <br></br>
      </div>

    );
  }
}


export default Question1;