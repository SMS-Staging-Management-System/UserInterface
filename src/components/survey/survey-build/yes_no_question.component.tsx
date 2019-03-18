import React from 'react';




export interface ISurveyBuildProps {
  //   user: IUserState,
  //   surveyTitle: string,
  //   type: string,
  //   errorMessage: string,
  //   newSurvey: {},
  //   handleSubmit(newSurvey: {}, userId: number): void
}


export class YesNoMaybe extends React.Component<ISurveyBuildProps, any> {
  constructor(props) {
    super(props);


  }


  //   handleChange = (event) => { 

  //   }

 


  render() {

    return (

      <div>


        {/* <button value="2" id="yn" className="form-control" name="type"  > Yes/No  </button> */}
        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="yn" className="form-control" > Yes/No </label>

           <div className="new" id="t2">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '100%' }}   ></input>
            <input name="answerText" value="Yes, No, Maybe" readOnly hidden />
          </div>
 
          <hr/>
      </div>

    );
  }
}


export default YesNoMaybe;