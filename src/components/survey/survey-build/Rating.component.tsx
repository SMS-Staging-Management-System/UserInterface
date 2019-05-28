import React from 'react';
import { DeleteButton } from './delete.component';
import AddOther from './add.other.component';

interface PropsPlease{
    parentFunction?: any,
    selfDestruct?: any,
    index?: number
  }

export class Rating extends React.Component<PropsPlease, any> {
    constructor(props) {
        super(props);

    }

    render() {

        return (

            <div>
                <table className="questionTableRow">
                    <tbody>
                        <tr>
                            <td className="myTr"><label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="rating" className="form-control" > Rating </label></td>
                            {this.props.parentFunction && <td><AddOther parentFunction={this.props.parentFunction} index={this.props.index} selfDestruct={this.props.selfDestruct}></AddOther></td>}
                            {this.props.selfDestruct && <td><DeleteButton selfDestruct={this.props.selfDestruct} index={this.props.index}></DeleteButton></td>}
                        </tr>
                    </tbody>
                </table>
                <div className="new" id="t4">

                    <input name="questionText" type="text" placeholder="Question Title (i.e. How likely are you to recommend our product to a friend? )" style={{ width: '100%' }}   ></input>
                    <input name="answerText" value="1,2,3,4,5" readOnly hidden />

                </div>

                <hr />

            </div>

        );
    }
}


export default Rating;