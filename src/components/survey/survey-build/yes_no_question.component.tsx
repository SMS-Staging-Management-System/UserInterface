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

export class YesNoMaybe extends React.Component<PropsPlease, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        <table className="questionTableRow">
          <tbody>
            <tr>
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="yn" className="form-control" > Yes/No </label></td>
              {this.props.parentFunction && <td><AddOther parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
           <div className="new" id="t2">
            <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '100%' }}  defaultValue={this.props.defaultQuestion} ></input>
=======

export class YesNoMaybe extends React.Component<any, any> {
  constructor(props) {
    super(props);


  }

  render() {

    return (

      <div>

        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="yn" className="form-control" > Yes/No </label>

           <div className="new" id="t2">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '100%' }}   ></input>
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            <input name="answerText" value="Yes, No, Maybe" readOnly hidden />
          </div>
 
          <hr/>
      </div>

    );
  }
}


export default YesNoMaybe;