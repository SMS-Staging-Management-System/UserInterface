import React from 'react';




export interface ISurveyBuildProps {
    //   user: IUserState,
    //   surveyTitle: string,
    //   type: string,
    //   errorMessage: string,
    //   newSurvey: {},
    //   handleSubmit(newSurvey: {}, userId: number): void
}


export class Rating extends React.Component<ISurveyBuildProps, any> {
    constructor(props) {
        super(props);

    }


    //   handleChange = (event) => { 

    //   }

  


    render() {

        return (

            <div>

                <button value="4" id="rating" className="form-control" name="type" >Rating  </button>
                   <div className="new" id="t4">

                        <input name="questionText" type="text" placeholder="Question Title (i.e. How likely are you to recommend our product to a friend? )" style={{ width: '100%' }}   ></input>
                        <input name="answerText" value="1, 2, 3, 4, 5" readOnly hidden />

                    </div>
           
                    <hr/>

            </div>

        );
    }
}


export default Rating;