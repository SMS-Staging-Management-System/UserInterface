import * as React from 'react';
export class AssociateCheckInSubmit extends React.Component<{}> {

  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    }
  }

  public handleChange = (event) => {
    this.setState({
      description: event.target.value
    })
    console.log(event.target.value)
  }

  public handleSubmit = (event) => {
    ;
    console.log('Check in successful');
    event.preventDefault();
  }

  public render() {
    return (
      <div id="associate-row-container">
        <div id="header-row">
          <h4 id="header-field">Check In</h4>

        </div>
        <form>
          <ul className="list-group list-group-flush bg-transparent">
            <li className="list-group-item flex-row-sb bg-transparent">
              <textarea id="textarea" placeholder="Description" onChange={this.handleChange} />
            </li>
          </ul>
        </form>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleSubmit}>Check In</button>
        </div>
        {/* end chicken request */}
      </div>

    );
  }
}

export default AssociateCheckInSubmit