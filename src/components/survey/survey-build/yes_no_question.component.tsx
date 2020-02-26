import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease {
  changeField?: any
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string
}

interface ComponentState {
  question: string
}

export class YesNoMaybe extends React.Component<PropsPlease, ComponentState> {
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
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="yn" className="form-control" > Yes/No </label></td>
              {/* {this.props.parentFunction && <td><AddOther name="Change Question Type" parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>} */}
              {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
        <div className="new" id="t2">
          <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '100%' }} value={this.state.question} onChange={this.handleChange}></input>
          <input name="answerText" value="Yes, No, Maybe" readOnly hidden />
        </div>

        <hr />
      </div>

    );
  }
}


export default YesNoMaybe;