import { ISurvey } from "../../model/surveys/ISurvey";
import { IAnswer } from "../../model/surveys/IAnswer";
import { IJunctionSurveyQuestion } from "../../model/surveys/IJunctionSurveyQuestion";
import { surveyClient } from "../../axios/sms-clients/survey-client";

// import { surveyClient } from "../../axios/sms-clients/survey-client";

export const surveyBuildTypes = {
  CreateSurvey: 'CreateSurvey'

}

export const createSurvey = (formData: any, completedTasks: any[]) => async (dispatch) => {
  console.log('CreateSurvey was called');

  // surveyClient.saveSurvey(survey);
  const survey: ISurvey = {
    closingDate: new Date(new Date().getTime() + 604800000),
    creator: '',
    dateCreated: new Date(),
    description: 'Example Survey 1 Description',
    questionJunctions: [],
    surveyId: 0,
    template: false,
    title: '',
  };
  const questionJunctions: IJunctionSurveyQuestion[] = [];
  const answers: IAnswer[] = [];


  let questionOrder = 1

  for (let index = 0; index < formData.length; index++) {
    switch (formData[index].name) {
      case 'title':
        survey.title = formData[index].value;
        break;
      case 'template?':
        survey.template = true;
        survey.closingDate = null;
        break;
      case 'description':
        survey.description = formData[index].value;
        break;
      case 'creator':
        survey.creator = formData[index].value;
        break;
      case 'questionText':
        const questionJunction: IJunctionSurveyQuestion = {
          id: 0,
          question: {
            answers: [],
            question: formData[index].value,
            questionId: 0,
            typeId: 0,
          },
          questionOrder,
          survey: {
            closingDate: new Date(new Date().getTime() + 604800000),
            creator: '',
            dateCreated: new Date(),
            description: '',
            questionJunctions: [],
            surveyId: 0,
            template: false,
            title: '',
          }
        }
    questionJunction.question.typeId = completedTasks[0].questionID;
    completedTasks.shift();

    questionOrder++;
    questionJunctions.push(questionJunction);
    break;
      case 'answerText':
const answer: any = {
  answer: formData[index].value,
  answerId: 0,
  question: null
}
answers.push(answer);
break;
    }
  }



for (const questionJunction of questionJunctions) {
  if (questionJunction.question.typeId !== 5) {
    let match: string = '';
    match = answers[0].answer;
    answers.shift();

    const matchArray = match.split(',');
    for (const str of matchArray) {
      const dummyAnswer: any = {
        answer: str.trim(),
        answerId: 0,
        question: null
      }
      questionJunction.question.answers.push(dummyAnswer);
    }
  }
}

survey.questionJunctions = questionJunctions;

console.log(survey)

const newSurvey = surveyClient.saveSurvey(survey);

dispatch({
  payload: newSurvey,
  type: surveyBuildTypes.CreateSurvey
})
}
