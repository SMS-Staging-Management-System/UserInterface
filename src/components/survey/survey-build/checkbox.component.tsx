import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string,
  defaultAnswer?: string
}

interface ComponentState {
  question: string,
  answer: string
}

export class CheckBox extends React.Component<PropsPlease, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.defaultQuestion ? this.props.defaultQuestion : '',
      answer: this.props.defaultAnswer ? this.props.defaultAnswer : ''
    }
  }

  handleChange = (event: any) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    })
  }

  render() {

    return (

      <div>
        <table className="questionTableRow">
          <tbody>
            <tr>
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="checkbox" className="form-control" > Checkboxes for Multiple Answers </label></td>
              {this.props.parentFunction && <td><AddOther name="Change Question Type"  parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
        <div className="new" id="t6">

          <input name="questionText" id='question' type="text" placeholder="Question Title (i.e. Choose one or more response: Which of these objects is white? )" style={{ marginLeft: "0px%", width: '100%' }}  value={this.state.question} onChange={this.handleChange} ></input>
          <br></br>
          <input name="answerText" id="answer" type="text" placeholder="answerText (i.e. the moon, rice, cotton, blueberries, lemons )" style={{ marginLeft: "0px", width: '100%' }}  value={this.state.answer} onChange={this.handleChange}></input>

        </div>
        <hr />
        <div className="yuay">

        </div>

      </div>

    );
  }
}


export default CheckBox;