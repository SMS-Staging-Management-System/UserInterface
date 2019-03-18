import React from 'react';




export interface ISurveyBuildProps {
  //   user: IUserState,
  //   surveyTitle: string,
  //   type: string,
  //   errorMessage: string,
  //   newSurvey: {},
  //   handleSubmit(newSurvey: {}, userId: number): void
}


export class FeedBack extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);

  }


  //   handleChange = (event) => { 

  //   }





  render() {

    return (

      <div>

        {/* <button value="5" id="feedback" className="form-control" name="type" >Feedback</button> */}
        <label htmlFor="" style={{ marginBottom: 0, textAlign:'center' }} id="feedback" className="form-control" > Feedback </label>

          <div className="new" id="t5">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Please give your feedback)" style={{ width: '100%' }}    >
            </input>

          </div>
          <hr/>
      </div>

    );
  }
}


export default FeedBack;