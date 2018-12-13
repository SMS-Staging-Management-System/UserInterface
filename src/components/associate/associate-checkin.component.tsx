import * as React from 'react';
export class AssociateCheckInSubmit extends React.Component<{}> {

  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    }
  }

  public handleChange(event) {
   this.setState({
     description:event.target.value
   })
   console.log(event.target.value)
  }

  public handleSubmit(event) {;
    alert('Check in successful');
    event.preventDefault();
  }

  public render() {
    return (
      <div id="associaterowboxthing">
        {/* here users will input their whatevers in dah chicken */}
        <div id="headerRow">
          <h4 id="headerField">Check In</h4>
          
        </div>
        <form>
          <ul className="list-group list-group-flush bg-transparent">
            <li className="list-group-item flex-row-sb bg-transparent">
              <textarea id="textarea" placeholder="Description" onChange={this.handleChange.bind(this)}/>
            </li>
          </ul>
          </form>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleSubmit.bind(this)}>Check In</button>
          </div>
        {/* end chicken request */}
      </div>
      
    );
  }
}

export default AssociateCheckInSubmit