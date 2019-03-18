import React from 'react';
import Chart from 'chart.js';


interface IChartDisplayProps {
chart:any,
chartAction:any,
setCanvas:any
}

export class AssociateChartComponent extends React.Component<IChartDisplayProps, any> { //the first argument should be IReportFormProps
  canvasRef : any;
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


componentDidMount()
{
  var ctx = this.canvasRef.current.getContext('2d');
  
  //chart is a closure
    let myChart = new Chart(ctx, {
        ...this.props.chart,
        type: 'doughnut',
});
if (!myChart) return;
	
  console.log(this.props.setCanvas);
  console.log(this.props.chartAction);
	this.props.chartAction(myChart);
	this.props.setCanvas(myChart);
	
	setTimeout((() => {myChart.update();}),5000);
    // console.log(this.props.chartAction);
	myChart.update();
	this.setState(null)
}

render() {
     

    return (
    <canvas  ref={this.canvasRef}></canvas>
    )
  }
 
}

