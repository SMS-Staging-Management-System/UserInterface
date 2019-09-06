import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IJunctionSurveyQuestion } from "../../model/surveys/junction-survey-question.model";
import { surveyClient } from "../../axios/sms-clients/survey-client";

// import { surveyClient } from "../../axios/sms-clients/survey-client";

export const surveyBuildTypes = {
  CreateSurvey: 'CreateSurvey'

}

export const createSurvey = (formData: any, completedTasks: any[]) => async (dispatch) => {
  console.log('CreateSurvey was called');

  // surveyClient.saveSurvey(survey);
  const survey: ISurvey = {
    surveyId: 0,
    title: '',
    description: 'Example Survey 1 Description',
    creator: '',
    dateCreated: new Date(),
    closingDate: new Date(new Date().getTime() + 604800000),
    template: false,
    questionJunctions: []
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
            questionId: 0,
            question: formData[index].value,
            typeId: 0,
            answers: []
          },
          survey: {
            surveyId: 0,
            title: '',
            description: '',
            creator: '',
            dateCreated: new Date(),
            closingDate: new Date(new Date().getTime() + 604800000),
            template: false,
            questionJunctions: []
          },
          questionOrder: questionOrder
        };
          questionJunction.question.typeId = completedTasks[0].questionID;
          completedTasks.shift();
        
        questionOrder++;
        questionJunctions.push(questionJunction);
        break;
      case 'answerText':
        const answer:  any = {
          answerId: 0,
          answer: formData[index].value,
          question: null
        }
        answers.push(answer);
        break;
    }
  }



  for (let i = 0; i < questionJunctions.length; i++){
    if (questionJunctions[i].question.typeId !== 5) {
      let match: string = '';
        match = answers[0].answer;
        answers.shift();

      const matchArray = match.split(',');
      for (let l = 0; l < matchArray.length; l++) {
        let dummyAnswer: any = {
          answerId: 0,
          answer: matchArray[l].trim(),
          question: null
        }
        questionJunctions[i].question.answers.push(dummyAnswer);
      }
    }
  }

  survey.questionJunctions = questionJunctions;

  console.log(survey)

  const newSurvey = surveyClient.saveSurvey(survey);

  dispatch({
    type: surveyBuildTypes.CreateSurvey,
    payload: newSurvey
  })
}
