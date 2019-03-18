import React from 'react';
import { connect } from 'react-redux';
import {AssociateChartComponent} from './AssociateChartComponent'
import {ManagerChartComponent} from './ManagerChartComponent'
import {getInfoAssociate} from '../../../actions/assoc-24-chart/assoc24chart.actions';
import {getInfoManager} from '../../../actions/manager-24-chart/manager24chart.actions';
import { IState } from '../../../reducers';

//requires the importing of Line and Item classes, which should also be in Store

 /*
 let receiptTest : Receipt[]
 let receiptLines : Line[]
 */

 /*
//passing everything thru props
interface IGroupProps {
    // receipt: Receipt,
    user: Users,
    groupReceipts: Receipt[],
    //lines have a 1:M relationship with items
    initializeReceipts: ()  => void,
    claimReceipt: (receiptID: number, claimant:number) => void, //as a user I would like to be able to claim a receipt
    claimLine: (receiptID: number, claimant:number, claimed: number) => void, //as a user I would like to be able to claim a line
}*/
export class ChartComponent extends React.Component<any, any> { //the first argument should be IReportFormProps
  constructor(props) {
    super(props);
  }
/*
// whenever the change the username input, call the updateUsername action with the value
initializeReceipts = () => {
  this.props.initializeReceipts() 
}

// whenever the change the username input, call the updateUsername action with the value
claimReceipt = (id:number, claiment:number) => {
  this.props.claimReceipt(id, claiment) 
}

// whenever the change the username input, call the updateUsername action with the value
claimLine = (event) => {
  event.preventDefault(); 
  this.props.claimLine(receiptID, uID, lineID) 
}

*/

/*
componentWillMount()
{
  this.props.initializeReceipts();
}
*/



render() {
     

    return (
    <div>
      <div id='AssociateChart'>
          <AssociateChartComponent/>
          <br/>
          <h2>
        Data according to the Associates.
        <hr/>
    </h2>
      </div>
      <div id='ManagerChart'>
          <ManagerChartComponent/>
          <br/>
          <h2>
        Data according to the Staging Manager.
        <hr/>
        </h2>
      </div>
    </div>
    )
  }
 
}

//connect this to the store and pass in the required states to Props
const mapStateToProps = (state: IState) => {
  return {
      managersChart : state.interviewState.managerChart,
      associatesChart : state.interviewState.associateChart
  }
}

const mapDispatchToProps = {
  getInfoAssociate,
  getInfoManager
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
