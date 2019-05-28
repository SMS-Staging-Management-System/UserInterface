import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
  parentFunction?: any,
  selfDestruct?: any,
  index?: number
}

export class MultipleChoice extends React.Component<PropsPlease, any> {
  constructor(props) {
    super(props);

   

  }

  render() {

    return (

      <div>
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

            <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ marginLeft: "0px" ,width: '100%' }}   ></input>
           <br/>
            <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ marginLeft: "0px", width: '100%' }}   ></input>

          </div>
         
   <hr/>
        <div className="yuay">

        </div>
        
      </div>

    );
  }
}


export default MultipleChoice;