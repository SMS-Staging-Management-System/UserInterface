import { surveyContext } from ".";
import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IResponse } from "../../model/surveys/response.model";

const surveyBaseRoute = '/surveys';
const questionBaseRoute = '/questions';
const answerBaseRoute = '/answers';
const responseBaseRoute = '/responses';
const questionTypeBaseRoute = '/questiontype';
const URL = 'http://localhost:8091/';

export const surveyClient = {

  //--------------------//
  //-- Survey Methods --//
  //--------------------//
























  
  saveSurvey(survey: ISurvey) {
    surveyContext.post(URL + surveyBaseRoute, survey);
  },

  async findAllSurveys() {
    let surveys = await surveyContext.get(URL + surveyBaseRoute)
    for (let index = 0; index < surveys.data.length; index++) {
      console.log(surveys.data[index]);

    }
    return surveys
  },
  async findAllSurveystemplate(templateType: boolean) {
    let surveys = await surveyContext.get(URL + surveyBaseRoute)
    let returntemplate: any[] = [];

    for (let index = 0; index < surveys.data.length; index++) {

      if (surveys.data[index].template == templateType) {
        returntemplate.push(surveys.data[index]);

      }

    }
    returntemplate.map(r => console.log(r));
    return returntemplate
  },
  async findSurveyById(id: number) {
    let surveys = await surveyContext.get(`${URL + surveyBaseRoute}/${id}`);

    console.log(surveys);

  },

  //----------------------//
  //-- Question Methods --//
  //----------------------//

  saveQuestion(question: IQuestion) {
    return surveyContext.post(questionBaseRoute, question)
  },

  async getQuestionType(index: number) {

    let resp = await surveyContext.get(URL + questionTypeBaseRoute);
    const body = resp.data;
    console.log(body[index].questionType);
    return body[index].questionType;
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
  },


}