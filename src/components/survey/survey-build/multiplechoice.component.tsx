import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease {
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

export class MultipleChoice extends React.Component<PropsPlease, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.defaultQuestion ? this.props.defaultQuestion : '',
      answer: this.props.defaultAnswer ? this.props.defaultAnswer : ''
    }

    this.handleChange = this.handleChange.bind(this);
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
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="multi" className="form-control" > Multiple Choice </label></td>
              {this.props.parentFunction && <td><AddOther name="Change Question Type" parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
        <div className="new" id="t1">
          <input
            name="questionText"
            id="question"
            type="text"
            placeholder="Question Title (i.e. What do you like best? )"
            style={{ marginLeft: "0px", width: '100%' }}
            value={this.state.question}
            onChange={this.handleChange}></input>
          <br />
          <input
            name="answerText"
            id="answer"
            type="text"
            placeholder="answerText (i.e. apples, pie, chicken, ... )"
            style={{ marginLeft: "0px", width: '100%' }}
            value={this.state.answer}
            onChange={this.handleChange}></input>
        </div>

        <hr />
        <div className="yuay">

        </div>

      </div>

    );
  }
}


export default MultipleChoice;