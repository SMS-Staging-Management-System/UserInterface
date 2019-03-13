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
const questionJunctionBaseRoute = '/junction_survey_questions';
const questionAllBaseRoute = '/questions/multi-question';



export const surveyClient = {

  //--------------------//
  //-- Survey Methods --//
  //--------------------//

  // saveSurvey(survey: ISurvey, question: IQuestion[], answer: IAnswer[]) { // this will be taking in ISurvey,IQuestion, and IAnswer and will enter seperate endpoints
  //   surveyContext.post(surveyBaseRoute, survey);
  //   // this.saveQuestion(question);
  //   // this.saveAnswer(answer);

  // },
  saveSurvey(survey: ISurvey) { // this will be taking in ISurvey,IQuestion, and IAnswer and will enter seperate endpoints
    // let today = `${survey.dateCreated.getFullYear()}-${(survey.dateCreated.getMonth()+1).toString().padStart(2, '0')}-${(survey.dateCreated.getDate()).toString().padStart(2, '0')}`

    // let convert = {
    //   surveyId: survey.surveyId,
    //   title: survey.title,
    //   description: survey.description,
    //   dateCreated: today,
    //   closingDate: null,
    //   template: survey.template,
    //   published: survey.published
    // }

console.log('this is the survey '+ survey);

     surveyContext.post(surveyBaseRoute, survey);
console.log('post finished');

    // this.saveQuestion(question);
    // this.saveAllAnswer(answer);

  },

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
  async findSurveyById(id: number) {
    let surveys = await surveyContext.get(`${surveyBaseRoute}/${id}`);

    console.log(surveys);

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
      let ID = parseInt(resp.data.questionId);      // return ID; 
console.log('THIS IS ID: '+ID);
return ID;

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
  saveToQuestionJunction(question: IQuestion) {
    surveyContext.post(questionJunctionBaseRoute, question);
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

 async saveAnswer(answer: IAnswer) {


     await surveyContext.post(answerBaseRoute, answer)




  },

  saveAllAnswer(answer: IAnswer[]) {
    for (let index = 0; index < answer.length; index++) {
      surveyContext.post(answerBaseRoute, answer[index]);
    }
  },
  

  //----------------------//
  //-- Response Methods --//
  //----------------------//  

  saveResponse(response: IResponse) {
    return surveyContext.post(responseBaseRoute, response)
  },


}