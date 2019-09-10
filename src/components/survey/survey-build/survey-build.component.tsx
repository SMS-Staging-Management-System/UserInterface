import React from 'react';
import $ from 'jquery'
import { MultipleChoice } from './multiplechoice.component';
import { YesNoMaybe } from './yes_no_question.component';
import { connect } from 'react-redux';
import { StronglyAgree } from './stronglyAgree.component';
import { Rating } from './Rating.component';
import { FeedBack } from './feedback.component';
import { CheckBox } from './checkbox.component';
import { TrueFalse } from './truefalse.component';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import { ISurveyState } from '../../../reducers/survey';
import { createSurvey } from '../../../actions/survey/SurveyBuild.action';
import { FaPlusSquare } from 'react-icons/fa';
import AddOther from './add.other.component';
import { setTimeout } from 'timers';
import { toast } from 'react-toastify';

interface IComponentProps extends RouteComponentProps<{}> {
  displaySurvey?: any,
  auth: IAuthState,
  match: any,
  surveyState: ISurveyState
  createSurvey: (frmData: any, completedTasks: any[]) => void
};

interface IComponentState {
  displaySurvey?: any,
  displayChoice: boolean,
  isSuccessfullySubmitted: boolean,
  showModal: boolean,
  todos: any,
  completedTasks: any,
  submitQuestions: any,
  notRenderedFirstTime: boolean,
  isCreating: boolean
}

export class SurveyBuild extends React.Component<IComponentProps, IComponentState>{
  constructor(props) {
    super(props);
    this.state = {
      displayChoice: false,
      isSuccessfullySubmitted: false,
      showModal: false,
      todos: [
        {
          questionID: 1, // make sure this questioID matches the id in the datatype for questiontype
          task: <TrueFalse />
        },
        {
          questionID: 2,
          task: <MultipleChoice />
        },
        {
          questionID: 3,
          task: <CheckBox />
        },
        {
          questionID: 4,
          task: <Rating />
        },
        {
          questionID: 5,
          task: <FeedBack />
        },
        {
          questionID: 6,
          task: <YesNoMaybe />
        },
        {
          questionID: 7,
          task: <StronglyAgree />
        }
      ],
      submitQuestions: [],
      completedTasks: [],
      notRenderedFirstTime: true,
      isCreating: false
    }
    this.toAddFunction = this.toAddFunction.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  deleteRow = (index) => {
    let temp: any[];
    temp = this.state.completedTasks;
    temp.splice(index, 1);

    this.setState({
      completedTasks: temp
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if ((this.state.completedTasks).length > 0) {
      let frmData = $(":input").serializeArray();
      frmData = [...frmData, { name: 'creator', value: this.props.auth.currentUser.email }];
      this.props.createSurvey(frmData, this.state.completedTasks);
      this.setState({
        ...this.state,
        isCreating: true
      })
      setTimeout(() => { this.setState({ ...this.state, isCreating: false }) }, 4000);
      this.handleShow();//user styleing for creating a survey
    }
    else {
      toast.error('In order to continue, you must choose a question type and fill out the appropriate fields.', { autoClose: 8000 })
    }

  }
  componentWillMount() {
    this.addSpecificSurvey();
  }
  componentDidMount() {
    this.setState({
      notRenderedFirstTime: false
    })

  }
  // test if there is a survey passed into the builder to start with, and if so add it to the proper array for rendering. 
  addSpecificSurvey = () => {
    if (this.props.history.location.state != undefined) {
      let survey = this.props.history.location.state.displaySurvey;
      const a = (survey.questionJunctions).length;
      const toSetQuestions: any[] = [];
      for (let i = 0; i < a; i++) {
        let type = survey.questionJunctions[i].question.typeId;
        if (type > 0) type--;
        toSetQuestions.push(this.state.todos[type]);
      }
      this.setState({
        completedTasks: toSetQuestions
      });
    }
  }
  handleShow = () => {
    $('#alertSubmission').show();
    setTimeout(function () {
      $('#alertSubmission').hide();
    }, 4000);
    this.setState({
      showModal: true
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  addClick = () => {
    this.setState({ displayChoice: true });
  }
  // adds specific question of a specific type to the the render array
  toAddFunction = (type: string) => {
    this.setState({ displayChoice: false });
    const { completedTasks, todos } = this.state;
    switch (type) {
      case "True/False":
        this.setState({
          completedTasks: [...completedTasks, todos[0]]
        });
        break;
      case "Multiple Choice":
        this.setState({
          completedTasks: [...completedTasks, todos[1]]
        });
        break;
      case "Checkbox Multiple Answer":
        this.setState({
          completedTasks: [...completedTasks, todos[2]]
        });
        break;
      case "Rating":
        this.setState({
          completedTasks: [...completedTasks, todos[3]]
        });
        break;
      case "Feedback":
        this.setState({
          completedTasks: [...completedTasks, todos[4]]
        });
        break;
      case "Yes/No":
        this.setState({
          completedTasks: [...completedTasks, todos[5]]
        });
        break;
      case "Strongly Agree/Disagree":
        this.setState({
          completedTasks: [...completedTasks, todos[6]]
        });
        break;
      default:
        console.log("No matching option for type: " + type);
    }
  }
  // renders components within the render array with given initial properties for props to be controled per question via multiple switch statements
  renderComponent = (type: number, index: number) => {
    let showme;
    if (this.props.history.location.state != undefined) {
      let survey = this.props.history.location.state.displaySurvey;
      if (survey.questionJunctions.length > index && this.state.notRenderedFirstTime) {
        const question = survey.questionJunctions[index].question.question;
        switch (type) {
          case 1://"True/False":
            showme = <TrueFalse selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} />;
            break;
          case 2://"Multiple Choice":
            let answers1 = "";
            for (let i = 0; i < (survey.questionJunctions[index].question.answers).length; i++) {
              answers1 += survey.questionJunctions[index].question.answers[i].answer;
              if (i !== ((survey.questionJunctions[index].question.answers).length - 1)) {
                answers1 += ", ";
              }
            }
            showme = <MultipleChoice selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} defaultAnswer={answers1} />;
            break;
          case 3://"Checkbox Multiple Answer":
            let answers = "";
            for (let i = 0; i < (survey.questionJunctions[index].question.answers).length; i++) {
              answers += survey.questionJunctions[index].question.answers[i].answer;
              if (i !== ((survey.questionJunctions[index].question.answers).length - 1)) {
                answers += ", ";
              }
            }
            //console.log(answers);
            showme = <CheckBox selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} defaultAnswer={answers} />;
            break;
          case 4://"Rating":
            showme = <Rating selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} />;
            break;
          case 5://"Feedback":
            showme = <FeedBack selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} />;
            break;
          case 6://"Yes/No":
            showme = <YesNoMaybe selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} />;
            break;
          case 7://"Strongly Agree/Disagree":
            showme = <StronglyAgree selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} defaultQuestion={question} />;
            break;
          default:
            break;
        }
      }
      else {
        switch (type) {
          case 1://"True/False":
            showme = <TrueFalse selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          case 2://"Multiple Choice":
            showme = <MultipleChoice selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          case 3://"Checkbox Multiple Answer":
            showme = <CheckBox selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          case 4://"Rating":
            showme = <Rating selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          case 5://"Feedback":
            showme = <FeedBack selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          case 6://"Yes/No":
            showme = <YesNoMaybe selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          case 7://"Strongly Agree/Disagree":
            showme = <StronglyAgree selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
            break;
          default:
            break;
        }
      }
    }
    else {
      switch (type) {
        case 1://"True/False":
          showme = <TrueFalse selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        case 2://"Multiple Choice":
          showme = <MultipleChoice selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        case 3://"Checkbox Multiple Answer":
          showme = <CheckBox selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        case 4://"Rating":
          showme = <Rating selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        case 5://"Feedback":
          showme = <FeedBack selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        case 6://"Yes/No":
          showme = <YesNoMaybe selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        case 7://"Strongly Agree/Disagree":
          showme = <StronglyAgree selfDestruct={this.deleteRow} index={index} parentFunction={this.toAddFunction} />;
          break;
        default:
          break;
      }
    }

    return showme;
  }
  render() {
    const { completedTasks } = this.state;

    return (
      <>
        <div className="container" >

          <div className="jumbotron survey-build-jumbotron" id="jumbotronSurveyBuild">

            <form onSubmit={this.handleSubmit} >
              <div id="123d" className={'form-group'}>
                <label htmlFor="title">Survey Title</label>
                {/*conditional rendering*/}
                {this.props.history.location.state && <input type="text" className="form-control" name="title" required defaultValue={this.props.history.location.state.displaySurvey.title} />}
                {!this.props.history.location.state && <input type="text" className="form-control" name="title" required />}
                <br />
                {this.props.history.location.state && <input type="checkbox" name="template?" defaultChecked={this.props.history.location.state.displaySurvey.template} />}
                {!this.props.history.location.state && <input type="checkbox" name="template?" />}
                Is this a template?
                <br></br><br></br>
                <label htmlFor="description">Survey Description</label>
                {this.props.history.location.state && <textarea className="form-control" name="description" placeholder="Survey Description" required defaultValue={this.props.history.location.state.displaySurvey.description}></textarea>}
                {!this.props.history.location.state && <textarea className="form-control" name="description" placeholder="Survey Description" required ></textarea>}
                <br />




                <label htmlFor="type">Add Question Types</label><br />

                {/* Used for dropping from a drag */}
                <div className="App">

                  <div data-required className="done" >
                    {completedTasks.map((task, index) =>
                      <div key={index}>
                        <br />
                        {task.task = this.renderComponent(task.questionID, index)}
                      </div>
                    )

                    }

                    {this.state.displayChoice === true && <AddOther name="Select Question Type" parentFunction={this.toAddFunction}></AddOther>}

                    {this.state.displayChoice === false && <button type="button" className="btn rev-btn" onClick={this.addClick}>Add Question <FaPlusSquare /> </button>}
                  </div>

                </div>

                <br /><br />{<button type="submit" className="createSurveyButton" disabled={this.state.isCreating}>Create Survey</button>}


              </div>
              <div id="alertSubmission" className="alert alert-success" role="alert">
                Your survey has been successfully submitted!</div>
            </form>

          </div>
        </div>
      </>


    );
  }
}

const mapStateToProps = (state: IState) => ({
  auth: state.managementState.auth,
  surveyBuildState: state.surveyState
});
const mapDispatchToProps = {
  createSurvey
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyBuild);
