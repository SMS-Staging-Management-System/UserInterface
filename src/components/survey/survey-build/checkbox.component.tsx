import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string,
  defaultAnswer?: string
  changeField?: any
}

interface ComponentState {
  question: any,
  answers: any
}

export class CheckBox extends React.Component<PropsPlease, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.defaultQuestion ? this.props.defaultQuestion : '',
      answers: this.props.defaultAnswer ? this.props.defaultAnswer : ''
    }
    this.props.changeField(this.props.index, this.props.defaultQuestion ? this.props.defaultQuestion : '', 'question');
    this.props.changeField(this.props.index, this.props.defaultAnswer ? this.props.defaultAnswer : '', 'answers');
  }

  handleChange = (event: any) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    })
    this.props.changeField(this.props.index, event.target.value, event.target.id);
  }

  componentDidUpdate(prevProps, prevStates){
    if(prevProps.defaultQuestion !== this.props.defaultQuestion){
      this.setState({
        ...this.state,
        question: this.props.defaultQuestion,
        answers: this.props.defaultAnswer
      })
    }
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
          <input name="answerText" id="answers" type="text" placeholder="answerText (i.e. the moon, rice, cotton, blueberries, lemons )" style={{ marginLeft: "0px", width: '100%' }}  value={this.state.answers} onChange={this.handleChange}></input>

        </div>
        <hr />
        <div className="yuay">

        </div>

      </div>

    );
  }
}


export default CheckBox;