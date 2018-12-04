import * as React from 'react';

export class AssociateCheckIn extends React.Component {
  // testing values here
  constructor(props) {
    super(props);
    this.state = {
      testfield1: 'test',
      testfield2: 'current time'
    };
    this.startTime = this.startTime.bind(this);
    this.checkTime = this.checkTime.bind(this);
  }

  // method for getting system time I have no idea if this will work as intended
  startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    // document.getElementById('txt').innerHTML =
    // h + ":" + m + ":" + s;
    let t = setTimeout(this.startTime, 500);
  }
  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  public render() {
    return (
      <div>
        {/* here users will input their whatevers for dah chicken */}
        <div>
          <h4>Check In</h4>
        </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item flex-row-sb">
              <input type="text" value="Description"></input>
            </li>
          </ul>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal">Check In</button>
          </div>
        {/* end chicken request */}
      </div>
      
    );
  }
}