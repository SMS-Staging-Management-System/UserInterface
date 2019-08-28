import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
  parentFunction?: any,
  selfDestruct?: any,
  index?: number,
  defaultQuestion?: string
}

export class StronglyAgree extends React.Component<PropsPlease, any> {
  constructor(props) {
    super(props);

  
  }

  render() {

    return (

      <div>
        <table className="questionTableRow">
          <tbody>
            <tr>
              <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="agree" className="form-control" > Strongly Agree-Strongly Disagree </label></td>
              {this.props.parentFunction && <td><AddOther parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
              {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
            </tr>
          </tbody>
        </table>
          <div className="new" id="t3">
         
            <input name="questionText" type="text" placeholder="Question Title (i.e. Product is easy to use )" style={{ width: '100%' }} defaultValue={this.props.defaultQuestion}  ></input>
                <input name="answerText" value="Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree" readOnly hidden />
                
         </div>
       

         <hr/>

      </div>

    );
  }
}


export default StronglyAgree;