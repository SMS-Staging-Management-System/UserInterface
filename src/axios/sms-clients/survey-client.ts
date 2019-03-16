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

  // saveSurvey(survey: ISurvey, question: IQuestion[], answer: IAnswer[]) { // this will be taking in ISurvey,IQuestion, and IAnswer and will enter seperate endpoints
  //   surveyContext.post(surveyBaseRoute, survey);
  //   // this.saveQuestion(question);
  //   // this.saveAnswer(answer);

  // },

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
  async findAllSurveystemplate(templateType: boolean) {
    let surveys = await surveyContext.get(surveyBaseRoute)
    let returntemplate: any[] = [];

    for (let index = 0; index < surveys.data.length; index++) {

      if (surveys.data[index].template == templateType) {
        returntemplate.push(surveys.data[index]);

      }

    }
    returntemplate.map(r => console.log(r));
    return returntemplate

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
        console.log("HERE I AM", survey.questionJunctions);
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
            questionJunction.questionId.answerChoices = response.data;
          })
          .catch(err => {
            console.log(err);
          });
      };
    }
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
        console.log('histories found');
      })
      .catch(err => {
        console.log(err);
      });
    // If loading failed, don't loop through surveys
    console.log('assSurveys in survey client', allSurveys);
    console.log('before for each');
    if (allSurveys !== undefined) {
      //Loop through the surveys, and save those that are in my histories
      allSurveys.forEach(survey => {
        myHistories.forEach(history => {
          if (survey.surveyId === history.surveyId) {
            myAssignedSurveys.push(survey);
          }
        })
      });
    }
    return myAssignedSurveys;
  },

  async saveSurvey(survey: ISurvey) {
    let resp = await surveyContext.post(surveyBaseRoute, survey);

    let sID = resp.data.surveyId;      // return ID; 
    console.log('THIS IS SURVEY  ID : ' + sID);
    return sID;
  },

  //----------------------//
  //-- Question Methods --//
  //----------------------//

  async saveQuestion(question: IQuestion) {
    //let ID = new Array;
    //  await surveyContext.post(questionBaseRoute, question.questionId).then(response => {
    //     this.answArray(  parseInt(response.data.questionId));

    //     });

    let resp = await surveyContext.post(questionBaseRoute, question.questionId);
    let qID = parseInt(resp.data.questionId);      // return ID; 
    console.log('THIS IS ID: ' + qID);
    return qID;

  },

  //    answArray( ID : number) {

  //     let anArray=new Array;
  //     anArray.push(ID)


  //     console.log(anArray)
  //   return anArray;

  // },

  saveAllQuestion(question: IQuestion[]) {

    surveyContext.post(questionAllBaseRoute, question);
  },
  saveToQuestionJunction(junction: IJunctionSurveyQuestion) {
    surveyContext.post(questionJunctionBaseRoute, junction);
  },

  async getQuestionType(index: number) {

    let resp = await surveyContext.get(questionTypeBaseRoute);
    const body = resp.data;
    console.log(body[index].questionType);
    return body[index].questionType;
  },

  //--------------------//
  //-- Answer Methods --//
  //--------------------//

  saveAnswer: (answer: IAnswer) => {
    answer.id = 0;
    return surveyContext.post(answerBaseRoute, answer)
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