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


export class Question4 extends React.Component<ISurveyBuildProps, any> {
    constructor(props) {
        super(props);

        this.state = { inputs4: [] }

    }


    //   handleChange = (event) => { 

    //   }

    addQuestion4 = () => {

        this.setState({
            inputs4: this.state.inputs4.concat([{ input: "" }])
        });
    }
    removeQuestion4 = () => {


        let userInput = this.state.inputs4
        userInput.pop();
        this.setState({
            inputs4: userInput
        });
    };



    render() {

        return (

            <div>

                <button value="4" id="rating" className="form-control" name="type" >Rating  </button>
                {this.state.inputs4.map((inputs) => (
                    <div className="new" id="t4">

                        <input name="questionText" type="text" placeholder="Question Title (i.e. How likely are you to recommend our product to a friend? )" style={{ width: '500px' }}   ></input>
                        <input name="answerText" value="1, 2, 3, 4, 5" readOnly hidden />

                    </div>
                ))}
                <div className="yuay">
                    <button type="button" onClick={this.addQuestion4} className="btn btn-primary" ><span>&#65291;</span> </button> &nbsp;&nbsp;<button type="button" onClick={() => this.removeQuestion4()} className="btn btn-primary" ><span>&#8722;</span> </button><br></br>
                </div>

                <br></br>

            </div>

        );
    }
}


export default Question4;