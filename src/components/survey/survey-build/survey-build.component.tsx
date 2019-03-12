import React from 'react';
//import { Draggable, Droppable } from 'react-drag-and-drop'



import $ from 'jquery'
import Question1 from './question1.component';
import Question2 from './question2.component';
import Question3 from './question3.component';
import Question4 from './question4.component';
import Question5 from './question5.component';
import Question6 from './question6.component';
import Question7 from './question7.component';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { ISurvey } from '../../../model/surveys/survey.model';
import { IQuestion } from '../../../model/surveys/question.model';
import { IAnswer } from '../../../model/surveys/answer.model';
// import { ISurveyBuildState, ISurveyState } from '../../../reducers/survey';
// import { CreatSurvey } from '../../../actions/survey/SurveyBuild.action';
// import { connect } from 'react-redux';




// export interface ISurveyBuildProps {
//   surveyBuild: ISurveyBuildState,
//   CreatSurvey: (survey: ISurvey) => void,

// }


class surveyBuild extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          questionID: 1, // make sure this questioID matches the id in the datatype for questiontype
          task: <Question1 /> //multiple choice
        },
        {
          questionID: 2,
          task: <Question2 />
        },
        {
          questionID: 3,
          task: <Question3 />
        },
        {
          questionID: 4,
          task: <Question4 />
        },
        {
          questionID: 5,
          task: <Question5 />
        },
        {
          questionID: 6,
          task: <Question6 />
        },
        {
          questionID: 7,
          task: <Question7 />
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
      // todos: todos.filter(task => task.questionID !== draggedTask.questionID),
      draggedTask: {},
    })
  }

  deleterow = (event, index) => {
    console.log(index);
    let temp: any[];
    temp = this.state.completedTasks;
    temp.splice(index, 1);

    this.setState({
      completedTasks: temp
    })
  }




  handleSubmit = async (event) => {
    event.preventDefault();

    let frmData = $(":input").serializeArray();
    frmData.splice(0, 13);
    //  `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`

    let dummySurvey: ISurvey = {
      surveyId: 1,
      title: frmData,
      description: 'Example Survey 1 Description',
      dateCreated: new Date('03-25-2019'),
      closingDate: new Date('03-25-2019'),
      template: false,
      published: true
    };
    console.log(dummySurvey.dateCreated)
    let dummyQuestionArray: IQuestion[] = [];

    let dummyAnswerArray: IAnswer[] = [];

    console.log(frmData);

    let questionindex = 0;
    for (let index = 0; index < frmData.length; index++) {

      let dummyquestion: IQuestion = {
        id: 0,
        question: 'string',
        typeId: 0,
      }

      let dummyAnswers: IAnswer = {
        id: 0,
        answer: "string",
        questionId: 0
      }

      switch (frmData[index].name) {
        case 'title':
          dummySurvey.title = frmData[index].value;
          dummySurvey.description = frmData[index].value;
          console.log(dummySurvey.title);
          break;

        case 'description':
          dummySurvey.description = frmData[index].value;
          console.log(dummySurvey.description);
          break;

        case 'questionText':
          //   console.log('current index '+index);
          dummyquestion.typeId = this.state.completedTasks[questionindex].questionID;
          console.log(dummyquestion.question = frmData[index].value);
          dummyQuestionArray.push(dummyquestion);
          questionindex += 1
          //  console.log(dummySurvey.description);
          break;
        case 'answerText':
          dummyAnswers.id = 0;
          dummyAnswers.questionId = questionindex;//if not then use questionindex
          dummyAnswers.answer = frmData[index].value;
          dummyAnswerArray.push(dummyAnswers);
          console.log(dummyAnswers)
          break;
        case 'template?':
          dummySurvey.template = true;
          break;

        default:
          break;
      }
    }


    //  surveyClient.saveSurvey(dummySurvey,dummyQuestionArray,dummyAnswerArray);
    // surveyClient.saveSurvey(dummySurvey);
    // this.props.CreatSurvey(dummySurvey);

  }
  testaxois = async (event) => {
    surveyClient.findSurveyById(2);
  }

  componentDidMount() {



    this.testaxois(event);
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

          <div className="jumbotron">

            <form onSubmit={this.handleSubmit} >
              <div id="123d" className={'form-group'}>
                <label htmlFor="title">Survey Title</label>
                <input type="title" className="form-control" name="title" required /><br />
                <input type="checkbox" name="template?" /> Is this a template?

     <br></br><br></br>
                <label htmlFor="description">Survey Description</label>
                <textarea className="form-control" name="description" placeholder="Survey Description" required></textarea><br />




                <label htmlFor="type">Add Question Types</label><br />

                {/* Used for dropping from a drag */}
                <div className="App">

                  <div onDrop={event => this.onDrop(event)} onDragOver={(event => this.onDragOver(event))} className="done">
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
                <br /><br /><button type="submit" className="btn btn-primary">Create Survey</button>

              </div>

            </form>


          </div>
        </div>
      </>



    );
  }
}

// const mapStateToProps = (state: ISurveyState) => {
//   return {
//     surveyBuild: state.surveyBuild,
//   }
// }


// const mapDispatchToProps = {
//   CreatSurvey
// }

// export default connect(mapStateToProps, mapDispatchToProps)(surveyBuild);

export default surveyBuild;
