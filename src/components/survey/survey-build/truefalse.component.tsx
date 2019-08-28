import React from 'react';
<<<<<<< HEAD
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string
}

export class TrueFalse extends React.Component<PropsPlease, any> {
  constructor(props) {
    super(props);
    
=======

export class TrueFalse extends React.Component<any, any> {
  constructor(props) {
    super(props);

>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

  }

  render() {

    return (

      <div>
<<<<<<< HEAD
        <table className="questionTableRow">
          <tbody>
            <tr>
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="tf" className="form-control" > True/False </label></td>
              {this.props.parentFunction && <td><AddOther parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton index={this.props.index} selfDestruct={this.props.selfDestruct}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
            <div className="new" id="t7">
              <input name="questionText" type="text" placeholder="Question Title (i.e. The sky is blue) " style={{ width: '100%' }}  defaultValue={this.props.defaultQuestion} ></input>
              <input name="answerText" value="True,False" readOnly hidden />
            </div>
            <hr />
=======
        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="tf" className="form-control" > True/False </label>

        <div className="new" id="t7">

          <input name="questionText" type="text" placeholder="Question Title (i.e. The sky is blue) " style={{ width: '100%' }}   ></input>
          <input name="answerText" value="True,False" readOnly hidden />
        </div>

        <hr />
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
      </div>

    );
  }
}


export default TrueFalse;