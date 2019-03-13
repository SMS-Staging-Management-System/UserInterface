import React from 'react';
//import { Draggable, Droppable } from 'react-drag-and-drop'



import $ from 'jquery'
import { MultipleChoice } from './multiplechoice.component';
import { YesNoMaybe } from './yes_no_question.component';
import { StronglyAgree } from './stronglyAgree.component';
import { Rating } from './Rating.component';
import { FeedBack } from './feedback.component';
import { CheckBox } from './checkbox.component';
import { TrueFalse } from './truefalse.component';
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
      dateCreated: new Date(),
      closingDate: null,
      template: false,
      published: true
    };
    // dummySurvey.closingDate.setDate(1);
    // dummySurvey.closingDate.setFullYear(0);
    // dummySurvey.closingDate.setMonth(0);





    console.log('cloasing date: ' + dummySurvey.closingDate)
    let dummyQuestionArray: IQuestion[] = [];

    let dummyAnswerArray: IAnswer[] = [];

    console.log(frmData);


    let questionindex = 0;
    for (let index = 0; index < frmData.length; index++) {

      let dummyquestion: IQuestion = {
        questionId: {
          questionId: 0,
          question: 'string',
          typeId: 0,
        }
      }
      let dummyAnswers: IAnswer = {
        id: 0,
        answer: "string",
        questionId: 0
      }
      // let dummyAnswers: IAnswer = {
      //   id: 0,
      //   answer: "string",
      //   questionId: 0
      // }

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
          dummyquestion.questionId.typeId = this.state.completedTasks[questionindex].questionID;
          console.log(dummyquestion.questionId.question = frmData[index].value);
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

    // //surveyClient.saveSurvey(dummySurvey,dummyQuestionArray,dummyAnswerArray);
    surveyClient.saveSurvey(dummySurvey);
    let questionid = new Array;
    //get current questionid into an array
    // this.props.CreatSurvey(dummySurvey);
    for (let index = 0; index < dummyQuestionArray.length; index++) {
      let num = await surveyClient.saveQuestion(dummyQuestionArray[index]);
      console.log(num + " this is the array you got")
      questionid.push(num);
    }


    for (let index = 0; index < dummyAnswerArray.length; index++) {

      //console.log( dummyAnswerArray[index].answer+ "HELLOOOOOOO")

      let match = dummyAnswerArray[index].answer.split(/[\s,]+/)
      console.log(match)
      for (let a in match) {

        let dummyAnswers: IAnswer = {
          id: 0,
          answer: "string",
          questionId: 0
        }

        let choice = match[a]
        dummyAnswers.answer = choice

        let change = dummyAnswerArray[0].questionId;//keep a temp variable to check if the surveys answer questionid changes
        let count = 0;

        for (let index = 0; index < dummyAnswerArray.length; index++) {
          if (change != dummyAnswerArray[index].questionId) {
            //if the change doesn't equal the surveys answer questionid
            //then a new question arrived
            change = dummyAnswerArray[index].questionId;
            count++;
          }
          dummyAnswerArray[index].questionId = questionid[count];
          dummyAnswers.questionId=questionid[count];

          surveyClient.saveAnswer(dummyAnswers);
          // console.log('this is the dummt answer: '+JSON.stringify(dummyAnswers));
      
        }

      }
      // let change = dummyAnswerArray[0].questionId;//keep a temp variable to check if the surveys answer questionid changes
      // let count = 0;

      // for (let index = 0; index < dummyAnswerArray.length; index++) {
      //   if (change != dummyAnswerArray[index].questionId) {
      //     //if the change doesn't equal the surveys answer questionid
      //     //then a new question arrived
      //     change = dummyAnswerArray[index].questionId;
      //     count++;
      //   }
      //   dummyAnswerArray[index].questionId = questionid[count];
      //     surveyClient.saveAnswer(dummyAnswerArray[index])
      //     console.log('this is the answer: '+dummyAnswerArray[index].answer);
      // console.log('this is the answer questionID: ' + dummyAnswerArray[index].questionId);
    }
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

          <div className="jumbotron survey-build-jumbotron">

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
