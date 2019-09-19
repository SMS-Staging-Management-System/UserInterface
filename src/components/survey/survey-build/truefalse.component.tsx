import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease {
  changeField?:any,
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string
}

interface ComponentState {
  question: string
}

export class TrueFalse extends React.Component<PropsPlease, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.defaultQuestion ? this.props.defaultQuestion : ''
    }
    this.props.changeField(this.props.index, this.props.defaultQuestion ? this.props.defaultQuestion : '', 'question');
  }

  handleChange = (event: any) => {
    this.setState({
      ...this.state,
      question: event.target.value
    })
    this.props.changeField(this.props.index, event.target.value, 'question');
  }

  render() {

    return (

      <div>
        <table className="questionTableRow">
          <tbody>
            <tr>
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="tf" className="form-control" > True/False </label></td>
              {this.props.parentFunction && <td><AddOther name="Change Question Type" parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton index={this.props.index} selfDestruct={this.props.selfDestruct}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
        <div className="new" id="t7">
          <input name="questionText" type="text" placeholder="Question Title (i.e. The sky is blue) " style={{ width: '100%' }} value={this.state.question} onChange={this.handleChange}></input>
          <input name="answerText" value="True,False" readOnly hidden />
        </div>
        <hr />
      </div>

    );
  }
}


export default TrueFalse;