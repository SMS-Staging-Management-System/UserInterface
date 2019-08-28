import React from 'react';
<<<<<<< HEAD
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string,
  defaultAnswer?: string
}

export class MultipleChoice extends React.Component<PropsPlease, any> {
=======

export class MultipleChoice extends React.Component<any, any> {
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  constructor(props) {
    super(props);

   

  }

  render() {

    return (

      <div>
<<<<<<< HEAD
        <table className="questionTableRow">
          <tbody>
            <tr>
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="multi" className="form-control" > Multiple Choice </label></td>
              {this.props.parentFunction && <td><AddOther parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
          <div className="new" id="t1">

            <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ marginLeft: "0px" ,width: '100%' }} defaultValue={this.props.defaultQuestion}  ></input>
           <br/>
            <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ marginLeft: "0px", width: '100%' }}   defaultValue={this.props.defaultAnswer}   ></input>
=======
        <label htmlFor="" style={{ marginBottom: 0, textAlign:'center' }} id="multi" className="form-control" > Multiple Choice </label>
     
          <div className="new" id="t1">

            <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ marginLeft: "0px" ,width: '100%' }}   ></input>
           <br/>
            <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ marginLeft: "0px", width: '100%' }}   ></input>
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

          </div>
         
   <hr/>
        <div className="yuay">

        </div>
        
      </div>

    );
  }
}


export default MultipleChoice;