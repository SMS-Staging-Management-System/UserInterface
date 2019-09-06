import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IJunctionSurveyQuestion } from "../../model/surveys/junction-survey-question.model";
import { surveyClient } from "../../axios/sms-clients/survey-client";

// import { surveyClient } from "../../axios/sms-clients/survey-client";

export const surveyBuildTypes = {
  CreatSurvey: 'CreatSurvey'

}

export const CreatSurvey = (frmData: any, completedTasks: any[]) => async (dispatch) => {
  console.log('CreatSurvey was called');

  // surveyClient.saveSurvey(survey);
  let dummySurvey: ISurvey = {
    surveyId: 1,
    title: frmData,
    description: 'Example Survey 1 Description',
    dateCreated: new Date(),
    closingDate: new Date(new Date().getTime() + 604800000),
    template: false,
    published: true
  };
  let dummyQuestionArray: IQuestion[] = [];
  let dummyAnswerArray: IAnswer[] = [];
  //beacuse there was a bug of sending data to the api(answers were out of order) 
  //we had to create another answer array that carried all of the parsed answers
  let parsedAnswers: IAnswer[] = [];
  let questionindex = 0;// used for connecting answers to their temp question index

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

    //switch between the types of data from the survey
    switch (frmData[index].name) {
      case 'title':
        dummySurvey.title = frmData[index].value;
        dummySurvey.description = frmData[index].value;
        break;

      case 'description':
        dummySurvey.description = frmData[index].value;
        break;

      case 'questionText':
        dummyquestion.questionId.typeId = completedTasks[questionindex].questionID;
        dummyquestion.questionId.question = frmData[index].value;
        dummyQuestionArray.push(dummyquestion);
        questionindex += 1//update the group of answers to this question
        break;
      case 'answerText':
        dummyAnswers.id = questionindex;
        dummyAnswers.questionId = questionindex;//if not then use questionindex
        dummyAnswers.answer = frmData[index].value;
        dummyAnswerArray.push(dummyAnswers);
        break;
      case 'template?':
        dummySurvey.template = true;
        dummySurvey.published = false;
        break;

      default:
        break;
    }
  }


  let junctionTable: IJunctionSurveyQuestion = {
    id: 0,
    questionId: {
      questionId: 0,
      question: 'string',
      typeId: 0,
    },
    questionOrder: 0,
    surveyId: dummySurvey,
  }

  let surveyId = await surveyClient.saveSurvey(dummySurvey);
  let questionid = new Array; // used to connect the answers to the database question id

  //loop through the question array that was filled during the frmdata loop
  for (let index = 0; index < dummyQuestionArray.length; index++) {
    //grab the questions id from the database
    //and push the id into the questionid array
    let num = await surveyClient.saveQuestion(dummyQuestionArray[index]);
    //beacuase feedback question has no answer we need to skip the question
    //in order to keep the correct structor 
    if (dummyQuestionArray[index].questionId.typeId != 5) {
      questionid.push(num);
    }

    junctionTable.questionId = dummyQuestionArray[index].questionId;
    junctionTable.questionId.questionId = num;

    junctionTable.questionOrder = index + 1;
    junctionTable.surveyId = dummySurvey;
    junctionTable.surveyId.surveyId = surveyId;


    surveyClient.saveToQuestionJunction(junctionTable);
  }

  let change = dummyAnswerArray[0].id;//keep a temp variable to check if the answer block is connected to its question
  let questionOrder = 0;

  for (let index = 0; index < dummyAnswerArray.length; index++) {

    let match = dummyAnswerArray[index].answer.split(",")//splits the answer choices by comma
    for (let a in match) {//gets each individual answer and creates an answer model to be submitted to the database


      let dummyAnswers: IAnswer = {
        id: 0,
        answer: "string",
        questionId: 0
      }

      let choice = match[a]
      dummyAnswers.answer = choice

      //if the answer block has reached a new question
      //update to the next answer block
      if (change != dummyAnswerArray[index].id) {

        change = dummyAnswerArray[index].id;
        questionOrder++;

      }

      dummyAnswerArray[index].questionId = questionid[questionOrder];
      dummyAnswers.questionId = questionid[questionOrder];

      parsedAnswers.push(dummyAnswers);
    }
  }

  for (let index = 0; index < parsedAnswers.length; index++) {
    await surveyClient.saveAnswer(parsedAnswers[index]);
  }
  dispatch({
    payload: {
      actionSurvey: dummySurvey,
      actionQuestion: dummyQuestionArray,
      actionAnswer: dummyAnswerArray,
      //beacuse there was a bug of sending data to the api(answers were out of order) 
      //we had to create another answer array that carried all of the parsed answers
      actionParsedAnswers: parsedAnswers,
      actionJunctionTable: junctionTable
    },
    type: surveyBuildTypes.CreatSurvey
  });
}
