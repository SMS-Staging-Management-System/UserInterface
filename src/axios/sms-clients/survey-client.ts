import { surveyContext } from ".";
import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IResponse } from "../../model/surveys/response.model";

const surveyBaseRoute = '/surveys';
const questionBaseRoute = '/questions';
const answerBaseRoute = '/answers';
const responseBaseRoute = '/responses';

export const surveyClient = {

  //--------------------//
  //-- Survey Methods --//
  //--------------------//

  findAllSurveys: async () => {
    let surveys;
    await surveyContext.get('surveys')
      .then(response => {
        surveys = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return surveys
  },

  findSurveyById: async (id: number) => {
    let survey;
    await surveyContext.get(`surveys/${id}`)
      .then(response => {
        survey = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return survey;
  },

  saveSurvey(survey: ISurvey) {
    return surveyContext.post(surveyBaseRoute, survey);
  },

  //----------------------//
  //-- Question Methods --//
  //----------------------//

  saveQuestion(question: IQuestion) {
    return surveyContext.post(questionBaseRoute, question)
  },

  //--------------------//
  //-- Answer Methods --//
  //--------------------//

  saveAnswer(answer: IAnswer) {
    return surveyContext.post(answerBaseRoute, answer)
  },

  //----------------------//
  //-- Response Methods --//
  //----------------------//  

  saveResponse(response: IResponse) {
    return surveyContext.post(responseBaseRoute, response)
  }
}