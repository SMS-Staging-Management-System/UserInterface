import React from 'react';




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


  }


  //   handleChange = (event) => { 

  //   }

 


  render() {

    return (

      <div>


        <button value="2" id="yn" className="form-control" name="type"  > Yes/No  </button>
           <div className="new" id="t2">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '500px' }}   ></input>
            <input name="answerText" value="Yes, No, Maybe" readOnly hidden />
          </div>
 
        <br></br>
      </div>

    );
  }
}


export default Question2;