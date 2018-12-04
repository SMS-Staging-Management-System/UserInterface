import * as React from 'react';

export class AssociateCheckIn extends React.Component {
  // testing values here
  constructor(props) {
    super(props);
    this.state = {
      testfield1: 'test',
      testfield2: 'current time'
    };
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