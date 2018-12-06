export class Cohort {
  public cohortId   = 0;
  public name       = '';

  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
        this[prop] = jsonObj[prop];
    }
  }
  // constructor(  cohortId: number, 
  //               name: string) {
  //   if (typeof (cohortId) === 'number') {
  //     this.cohortId = cohortId;
  //   }
  //   if (typeof (name) === 'string') {
  //     this.name = name;
  //   }
  // }
}