import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IResponse } from "../../model/surveys/response.model";
import { IJunctionSurveyQuestion } from "../../model/surveys/junction-survey-question.model";
import { smsClient } from ".";
const surveyBaseRoute = '/survey-service/surveys';
const templateRoute = '/survey-service/surveys/template/'
const surveyAllBaseRoute = '/survey-service/surveys/all';
const questionBaseRoute = '/survey-service/questions';
const answerBaseRoute = '/survey-service/answers';
const responseBaseRoute = '/survey-service/responses';
const questionTypeBaseRoute = '/survey-service/questiontype';
const questionJunctionBaseRoute = '/survey-service/junction_survey_questions';
const questionAllBaseRoute = '/survey-service/questions/multi-question';
const historyBaseRoute = '/survey-service/history';
const junctionSurveyQuestionsBaseRoute = '/survey-service/junction_survey_questions';
let totalPages = 0;
let pages = 0;
export const surveyClient = {
  //--------------------//
  //-- Survey Methods --//
  //--------------------//
  // we use the surveyroute and add the uri plus the parametor comig from the getsurveybyTitle
  // this is our fetch call on which if dont have a body back we will return
  // the empty array declare on the first line.
  findSurveyByTitle: async (title: string) => {
     return await smsClient.get(`${surveyBaseRoute}/title/${title}`)
  },
  // we use the surveyroute and add the uri plus the parametor comig from the getsurveybyDescription
  // this is our fetch call on which if dont have a body back we will return
  // the empty array declare on the first line.
  findSurveyByDescription: async (description: string) => {
    return await smsClient.get(`${surveyBaseRoute}/description/${description}`)
  },

  findAllSurveys: async () => {
    const resp = await smsClient.get(surveyBaseRoute + '/published');
    return resp.data;   
  },

  findAllTemplates: async (creator: string ,page: number) => {
    let surveysAndTemplates;
    let templates: any = [];
    pages += page;
    if (pages < 0) {
      pages = 0
    } else if (pages > 0) {
      if (pages >  totalPages) {
        pages = totalPages;
      }
    }
    let resp = await smsClient.get(templateRoute + 'creator/' + creator + '/' + pages)
    surveysAndTemplates = resp.data;
    if (surveysAndTemplates) {
      surveysAndTemplates.content.forEach(element => {
        templates.push(element);
      });
      totalPages = surveysAndTemplates.totalPages;
      console.log("total pages: " + totalPages)
    }
    return templates;
  },
  findByTitle: async (title: String, page: number) => {
    let surveysAndTemplates;
    let templates: any = [];
    pages += page;
    if (pages < 0) {
      pages = 0
    } else if (pages > 0) {
      if (pages >  totalPages) {
        pages = totalPages;
      }
    }
    let resp = await smsClient.get(templateRoute + `/${title}/` + pages)
    surveysAndTemplates = resp.data;
    if (surveysAndTemplates) {
      surveysAndTemplates.content.forEach(element => {
        templates.push(element);
      });
      totalPages = surveysAndTemplates.totalPages;
    }
    return templates;
  },
  changePage: async (page: number) => {
    // let pages = 0;
    pages += page;
    if (pages < 0) {
      pages = 0
    } else if (pages > 0) {
      pages--
      if (pages >= totalPages) {
        pages = totalPages;
      }
    }
    let resp = await smsClient.get(templateRoute + page)
    let surveysAndTemplates;
    let templates: any = [];
    surveysAndTemplates = resp.data;
    if (surveysAndTemplates) {
      surveysAndTemplates.forEach(element => {
        templates.push(element);
      });
      totalPages = surveysAndTemplates.totalPages;
    }
    return templates;
  },
  totalPages() {
    return totalPages;
  },
  currentPage() {
    let sentPage = pages + 1;
    return sentPage;
  },
  findSurveyById: async (id: number) => {
    let response = await smsClient.get(`${surveyBaseRoute}/${id}`);
    return response.data;
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


  findSurveysAssignedToUser: async (email: string) => {
    let myAssignedSurveys: any[] = [];
    // Get all surveys
    let allSurveys = await surveyClient.findAllSurveys();

    // Get histories by email
    let myHistories = await surveyClient.findHistoriesByEmail(email);

    console.log(myHistories)
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
    return resp.data
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

  findHistoriesByEmail: async (email: string) => {
    let response = await smsClient.post(historyBaseRoute +'/email', JSON.stringify(email))
    return response.data
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
  findHistoriesBySurveyId: async (id: number, pageId: number) => {
    let histories;
    await smsClient.get(`${historyBaseRoute}/pageable/${id}/${pageId}`)
      .then(response => {
        console.log('Total pages : ' + response.data.totalPages);
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
  },
  //working on pg
  // findAllByPage(page: number) {
  //   return smsClient.get(historyBaseRoute+`/page/${page}`)
  // },
}