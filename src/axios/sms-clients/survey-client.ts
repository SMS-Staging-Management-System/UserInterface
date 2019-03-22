import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IResponse } from "../../model/surveys/response.model";
import { IJunctionSurveyQuestion } from "../../model/surveys/junction-survey-question.model";
import { smsClient } from ".";

const surveyBaseRoute = '/survey-service/surveys';
const questionBaseRoute = '/survey-service/questions';
const answerBaseRoute = '/survey-service/answers';
const responseBaseRoute = '/survey-service/responses';
const questionTypeBaseRoute = '/survey-service/questiontype';
const questionJunctionBaseRoute = '/survey-service/junction_survey_questions';
const questionAllBaseRoute = '/survey-service/questions/multi-question';
const historyBaseRoute = '/survey-service/history';
const junctionSurveyQuestionsBaseRoute = '/survey-service/junction_survey_questions';

export const surveyClient = {

  //--------------------//
  //-- Survey Methods --//
  //--------------------//

  findAllSurveys: async () => {
    let surveysAndTemplates;
    let surveys: any = [];
    await smsClient.get(surveyBaseRoute)
      .then(response => {
        surveysAndTemplates = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    if (surveysAndTemplates) {
      surveysAndTemplates.forEach(element => {
        if (!element.template) {
          surveys.push(element);
        }
      });
    }
    return surveys;
  },
  findAllTemplates: async () => {
    let surveysAndTemplates;
    let templates: any = [];
    await smsClient.get(surveyBaseRoute)
      .then(response => {
        surveysAndTemplates = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    if (surveysAndTemplates) {
      surveysAndTemplates.forEach(element => {
        if (element.template) {
          templates.push(element);
        }
      });
    }
    return templates;

  },
  findSurveyById: async (id: number) => {
    // Get the Survey
    let survey;
    await smsClient.get(`${surveyBaseRoute}/${id}`)
      .then(response => {
        survey = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    // Get the Junctions of Survey Questions
    let junctions;
    await smsClient.get(`${junctionSurveyQuestionsBaseRoute}/surveyId/${id}`)
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
    // If statement prevents crashing if the API server is down
    if (survey) {
      for (const questionJunction of survey.questionJunctions) {
        await smsClient.get(`${answerBaseRoute}/question/${questionJunction.questionId.questionId}`)
          .then(response => {
            let answerChoices = response.data;
            // If it is a rating question, sort the ratings
            // if (questionJunction.typeId === 4) {
            //   answerChoices.sort((a, b) => (a.answer > b.answer) ? 1 : -1);
            // }
            questionJunction.questionId.answerChoices = answerChoices;
          })
          .catch(err => {
            console.log(err);
          });
      };
    }
    return survey;
  },
  countResponses: async (id: number) => {
    const allResponses = await smsClient.get(`${responseBaseRoute}/surveyId/${id}`);
    const responseCount = {};
    allResponses.data.forEach(element => {
      const answerChosen = element.answerId.id;
      if (!responseCount[answerChosen]) {
        responseCount[answerChosen] = 1;
      } else {
        responseCount[answerChosen]++;
      }
    });
    return responseCount;
  },
  findSurveyByIdWithResponses: async (id: number) => {
    // Get the Survey
    let survey = await surveyClient.findSurveyById(id);

    // Get the Responses
    const responseCount = await surveyClient.countResponses(id);

    // Add the response count to each question
    survey.questionJunctions.forEach(question => {
      if (question.questionId.typeId !== 5) {
        question.questionId.answerChoices.forEach(choice => {
          if (responseCount[choice.id]) {
            choice.responseCount = responseCount[choice.id];
          } else {
            choice.responseCount = 0;
          }
        });
      }
    });
    return survey;
  },


  findSurveysAssignedToUser: async (email: String) => {
    let allSurveys: any[] = [];
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
    // If loading failed, don't loop through surveys, preventing crashing the page if the api server is down
    if (myHistories !== undefined) {
      //Loop through the histories, and save the corresponding survey
      myHistories.forEach(history => {
        if (history.dateCompleted === null) {
          allSurveys.forEach(survey => {
            if (survey.surveyId === history.surveyId) {
              myAssignedSurveys.push(survey);
            }
          })
        }
      });
    }
    return myAssignedSurveys;
  },

  async saveSurvey(survey: ISurvey) {
    let resp = await smsClient.post(surveyBaseRoute, survey);
    let sID = resp.data.surveyId;      // return ID; 
    return sID;
  },

  //----------------------//
  //-- Question Methods --//
  //----------------------//

  async saveQuestion(question: IQuestion) {
    let resp = await smsClient.post(questionBaseRoute, question.questionId);
    let qID = parseInt(resp.data.questionId);      // return ID; 
    return qID;
  },

  saveAllQuestion(question: IQuestion[]) {

    smsClient.post(questionAllBaseRoute, question);
  },
  saveToQuestionJunction(junction: IJunctionSurveyQuestion) {
    smsClient.post(questionJunctionBaseRoute, junction);
  },

  async getQuestionType(index: number) {

    let resp = await smsClient.get(questionTypeBaseRoute);
    const body = resp.data;
    return body[index].questionType;
  },

  //--------------------//
  //-- Answer Methods --//
  //--------------------//

  async saveAnswer(answer: IAnswer) {
    answer.id = 0;
    return await smsClient.post(answerBaseRoute, answer)
  },

  saveAllAnswer(answer: IAnswer[]) {
    for (let index = 0; index < answer.length; index++) {
      smsClient.post(answerBaseRoute, answer[index]);
    }
  },

  //----------------------//
  //-- Response Methods --//
  //----------------------//  

  saveResponse: (response: IResponse) => {
    return smsClient.post(responseBaseRoute, response)
  },

  //---------------------//
  //-- History Methods --//
  //---------------------//  

  findHistoriesByEmail: async (email: String) => {
    let histories;
    await smsClient.post(`${historyBaseRoute}/email`, email)
      .then(response => {
        histories = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return histories;
  },
  assignSurveyByIdAndEmail(id: number, email: string) {
    const postObject = {
      "dateAssigned": new Date(),
      "dateCompleted": null,
      "historyId": 0,
      "surveyId": id,
      "userEmail": email
    }
    smsClient.post(historyBaseRoute, postObject);
  },

  findHistoriesBySurveyId: async (id: number) => {
    let histories;
    await smsClient.get(`${historyBaseRoute}/survey/${id}`)
      .then(response => {
        histories = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return histories;
  },

  updateHistoryAsComplete(id: number) {
    const historyUpdate = {
      "historyId": id,
      "surveyId": 0,
      "userEmail": '',
      "dateAssigned": new Date(),
      "dateCompleted": new Date()
    }
    smsClient.patch(`${historyBaseRoute}/taken`, historyUpdate);
  }
}