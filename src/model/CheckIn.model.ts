export class CheckIn {
  public checkInId  = 0;
  public userId     = 0;
  public submitTime       = '';
  public description      = '';
  public managerComments	= '';

  constructor(  checkInId?: number, 
                userId?: number,
                submitTime?: string,
                description?: string,
                managerComments?: string
                ) {
    if (typeof (checkInId) === 'number') {
      this.checkInId = checkInId;
    }
    if (typeof (userId) === 'number') {
      this.userId = userId;
    }
    if (typeof (submitTime) === 'string') {
      this.submitTime = submitTime;
    }
    if (typeof (description) === 'string') {
      this.description = description;
    }
    if(managerComments !== '') {
      if (typeof (managerComments) === 'string') {
        this.managerComments = managerComments;
      }
    } else 
      this.managerComments = '';
  }
}