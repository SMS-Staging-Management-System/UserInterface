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
import { ISurvey } from '../../../model/surveys/survey.model';
import { IQuestion } from '../../../model/surveys/question.model';
import { IAnswer } from '../../../model/surveys/answer.model';

import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import { ISurveyState } from '../../../reducers/survey';
import { CreatSurvey } from '../../../actions/survey/SurveyBuild.action';

interface IComponentProps extends RouteComponentProps<{}> {
  auth: IAuthState,
  match: any,
  surveyState: ISurveyState
  CreatSurvey: (frmData: any, completedTasks: any[]) => void
};

class surveyBuild extends React.Component<IComponentProps, any>{
  constructor(props) {
    super(props);
    this.state = {
      isSuccessfullySubmitted: false,
      showModal: false,
      todos: [
        {
          questionID: 1, // make sure this questioID matches the id in the datatype for questiontype
          task: <TrueFalse /> //multiple choice
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
      completedTasks: [],
      draggedTask: {}
    }
  }

  onDrag = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    const { completedTasks, draggedTask } = this.state;


    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      draggedTask: {},
    })
  }

  deleterow = (event, index) => {
    let temp: any[];
    temp = this.state.completedTasks;
    temp.splice(index, 1);

    this.setState({
      completedTasks: temp
    })
  }






  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.completedTasks.length > 0) {
      let frmData = $(":input").serializeArray();
      //frm data takes in too much data so splice until only title is received
      frmData.splice(0, 13);

      this.props.CreatSurvey(frmData, this.state.completedTasks);
    }
    else {
      alert('In order to continue, you must choose a question type and fill out the appropriate fields.');
    }
    this.handleShow();//user styleing for creating a survey
  }

  testaxois = async (event) => {
    surveyClient.findSurveyById(2);
  }

  componentDidMount() {
    this.testaxois(event);
  }

  handleShow = () => {
    $('#alertSubmission').show();
    setTimeout(function () {
      $('#alertSubmission').hide();
    }, 3000);
    this.setState({
      showModal: true
    })
  }
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  render() {
    const { todos, completedTasks } = this.state;

    return (
      <>
        {/* Used for dragging */}
        <div className="test">
          <div className="todos" >
            {
              todos.map(todo =>
                <div key={todo.questionID} draggable onDrag={(event) => this.onDrag(event, todo)}>
                  {todo.task}
                </div>

              )
            }</div></div>





        <div className="container" >

          <div className="jumbotron survey-build-jumbotron" id="jumbotronSurveyBuild">

            <form onSubmit={this.handleSubmit} >
              <div id="123d" className={'form-group'}>
                <label htmlFor="title">Survey Title</label>
                <input type="text" className="form-control" name="title" required /><br />
                <input type="checkbox" name="template?" /> Is this a template?

     <br></br><br></br>
                <label htmlFor="description">Survey Description</label>
                <textarea className="form-control" name="description" placeholder="Survey Description" required></textarea><br />




                <label htmlFor="type">Add Question Types</label><br />

                {/* Used for dropping from a drag */}
                <div className="App">

                  <div data-required onDrop={event => this.onDrop(event)} onDragOver={(event => this.onDragOver(event))} className="done" >
                    {completedTasks.map((task, index) =>
                      <div key={index}>
                        <br />

                        <button className="btn btn-primary" onClick={() => this.deleterow(event, index)}>Remove &#8628;</button>
                        {task.task}


                      </div>

                    )
                    }
                  </div>
                </div>

                <br /><br /><button type="submit" className="createSurveyButton" >Create Survey</button>


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
  CreatSurvey
}
export default connect(mapStateToProps, mapDispatchToProps)(surveyBuild);
