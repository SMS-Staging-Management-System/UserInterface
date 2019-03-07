import React from 'react';
/*
import { IGroupState } from '../../reducers';
import { ReceiptDisplayComponent } from './Receipt.display.component';
import { Receipt } from '../../models/Receipt';
import { Line } from '../../models/Line';
import { Item } from '../../models/Item';
import { Users } from '../../models/Users';
*/

//requires the importing of Line and Item classes, which should also be in Store

 /*
 let receiptTest : Receipt[]
 let receiptLines : Line[]
 */


interface IChartDisplayProps {
    // receipt: Receipt,
}


export class ChartDisplayComponent extends React.Component<IChartDisplayProps, any> { //the first argument should be IReportFormProps
  canvasRef : any;
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
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


componentDidMount()
{
  //this.props.initializeReceipts();
  //var ctx = this.canvasRef.current.getContext('2d');
    /*var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});*/
}


render() {
     

    return (
    <canvas ref={this.canvasRef}></canvas>
    )
  }
 
}

