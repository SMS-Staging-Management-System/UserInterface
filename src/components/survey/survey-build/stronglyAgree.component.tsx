import React from 'react';




export interface ISurveyBuildProps {
  //   user: IUserState,
  //   surveyTitle: string,
  //   type: string,
  //   errorMessage: string,
  //   newSurvey: {},
  //   handleSubmit(newSurvey: {}, userId: number): void
}


export class StronglyAgree extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);

  
  }


  //   handleChange = (event) => { 

  //   }

 


  render() {

    return (

      <div>
        {/* <button value="3" id="agree" className="form-control" name="type" > Strongly Agree-Strongly Disagree  </button> */}
        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="agree" className="form-control" > Strongly Agree-Strongly Disagree </label>

          <div className="new" id="t3">
         
            <input name="questionText" type="text" placeholder="Question Title (i.e. Product is easy to use )" style={{ width: '100%' }}   ></input>
                <input name="answerText" value="Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree" readOnly hidden />
                
         </div>
       

         <hr/>

      </div>

    );
  }
}


export default StronglyAgree;