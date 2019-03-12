import { surveyContext } from ".";
import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IResponse } from "../../model/surveys/response.model";

const surveyBaseRoute = '/surveys';
const questionBaseRoute = '/questions';
const answerBaseRoute = '/answers';
const responseBaseRoute = '/responses';
const historyBaseRoute = '/history';
const junctionSurveyQuestionsBaseRoute = '/junction_survey_questions';

export const surveyClient = {

  //--------------------//
  //-- Survey Methods --//
  //--------------------//

  findAllSurveys: async () => {
    let surveys;
    await surveyContext.get(surveyBaseRoute)
      .then(response => {
        surveys = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return surveys
  },

  findSurveyById: async (id: number) => {
    // Get the Survey
    let survey;
    await surveyContext.get(`${surveyBaseRoute}/${id}`)
      .then(response => {
        survey = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    // Get the Junctions of Survey Questions
    let junctions;
    await surveyContext.get(`${junctionSurveyQuestionsBaseRoute}/surveyId/${id}`)
      .then(response => {
        junctions = response.data;
        // Sort the junction by question order
        junctions.sort((a, b) => (a.questionOrder > b.questionOrder) ? 1 : -1)
        survey.questionJunctions = junctions;
      })
      .catch(err => {
        console.log(err);
      });
    // Append Answers to the Questions
    for (const questionJunction of survey.questionJunctions) {
      await surveyContext.get(`${answerBaseRoute}/question/${questionJunction.questionId.questionId}`)
        .then(response => {
          questionJunction.questionId.answerChoices = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    };
    return survey;
  },

  findSurveysAssignedToUser: async (email: String) => {
    let allSurveys;
    let myAssignedSurveys: any[] = [];
    let myHistories;
    // Get all surveys
    await surveyClient.findAllSurveys()
      .then(response => {
        allSurveys = response;
      })
      .catch(err => {
        console.log(err);
      });
    // Get histories by email
    await surveyClient.findHistoriesByEmail(email)
      .then(response => {
        myHistories = response;
      })
      .catch(err => {
        console.log(err);
      });
    //Loop through the surveys, and save those that are in my histories
    allSurveys.forEach(survey => {
      myHistories.forEach(history => {
        if (survey.surveyId === history.surveyId) {
          myAssignedSurveys.push(survey);
        }
      })
    });
    return myAssignedSurveys;
  },

  saveSurvey: (survey: ISurvey) => {
    return surveyContext.post(surveyBaseRoute, survey);
  },

  //----------------------//
  //-- Question Methods --//
  //----------------------//

  saveQuestion: (question: IQuestion) => {
    return surveyContext.post(questionBaseRoute, question)
  },

  //--------------------//
  //-- Answer Methods --//
  //--------------------//

  saveAnswer: (answer: IAnswer) => {
    return surveyContext.post(answerBaseRoute, answer)
  },

  //----------------------//
  //-- Response Methods --//
  //----------------------//  

  saveResponse: (response: IResponse) => {
    return surveyContext.post(responseBaseRoute, response)
  },

  //---------------------//
  //-- History Methods --//
  //---------------------//  

  findHistoriesByEmail: async (email: String) => {
    let histories;
    await surveyContext.post(`${historyBaseRoute}/email/`, email)
      .then(response => {
        histories = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return histories;
  },
}