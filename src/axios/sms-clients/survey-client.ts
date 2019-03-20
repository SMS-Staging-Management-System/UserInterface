import { surveyContext } from ".";
import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IResponse } from "../../model/surveys/response.model";
import { IJunctionSurveyQuestion } from "../../model/surveys/junction-survey-question.model";

const surveyBaseRoute = '/surveys';
const questionBaseRoute = '/questions';
const answerBaseRoute = '/answers';
const responseBaseRoute = '/responses';
const questionTypeBaseRoute = '/questiontype';
const questionJunctionBaseRoute = '/junction_survey_questions';
const questionAllBaseRoute = '/questions/multi-question';
const historyBaseRoute = '/history';
const junctionSurveyQuestionsBaseRoute = '/junction_survey_questions';

export const surveyClient = {

  //--------------------//
  //-- Survey Methods --//
  //--------------------//

  findAllSurveys: async () => {
    let surveysAndTemplates;
    let surveys: any = [];
    await surveyContext.get(surveyBaseRoute)
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
    await surveyContext.get(surveyBaseRoute)
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
    // If statement prevents crashing if the API server is down
    if (survey) {
      for (const questionJunction of survey.questionJunctions) {
        await surveyContext.get(`${answerBaseRoute}/question/${questionJunction.questionId.questionId}`)
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
    const allResponses = await surveyContext.get(`responses/surveyId/${id}`);
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
    let resp = await surveyContext.post(surveyBaseRoute, survey);
    let sID = resp.data.surveyId;      // return ID; 
    return sID;
  },

  //----------------------//
  //-- Question Methods --//
  //----------------------//

  async saveQuestion(question: IQuestion) {
    let resp = await surveyContext.post(questionBaseRoute, question.questionId);
    let qID = parseInt(resp.data.questionId);      // return ID; 
    return qID;
  },

  saveAllQuestion(question: IQuestion[]) {

    surveyContext.post(questionAllBaseRoute, question);
  },
  saveToQuestionJunction(junction: IJunctionSurveyQuestion) {
    surveyContext.post(questionJunctionBaseRoute, junction);
  },

  async getQuestionType(index: number) {

    let resp = await surveyContext.get(questionTypeBaseRoute);
    const body = resp.data;
    return body[index].questionType;
  },

  //--------------------//
  //-- Answer Methods --//
  //--------------------//

  async saveAnswer(answer: IAnswer) {
    answer.id = 0;
    return await surveyContext.post(answerBaseRoute, answer)
  },

  saveAllAnswer(answer: IAnswer[]) {
    for (let index = 0; index < answer.length; index++) {
      surveyContext.post(answerBaseRoute, answer[index]);
    }
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
    await surveyContext.post(`${historyBaseRoute}/email`, email)
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
    surveyContext.post(historyBaseRoute, postObject);
  },

  findHistoriesBySurveyId: async (id: number) => {
    let histories;
    await surveyContext.get(`${historyBaseRoute}/survey/${id}`)
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
    surveyContext.patch(`${historyBaseRoute}/taken`, historyUpdate);
  }
}