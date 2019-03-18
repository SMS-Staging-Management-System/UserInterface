import React from 'react';
import Chart from 'chart.js';


interface IChartDisplayProps {
chart:any,
chartAction:any,
setCanvas:any
}

export class FeedbackDeliveredChartComponent extends React.Component<IChartDisplayProps, any> { //the first argument should be IReportFormProps
  canvasRef : any;
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }


componentWillMount()
{

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
	//this.props.chartAction(myChart);
	this.props.setCanvas(myChart);
	this.props.chartAction(myChart);
	console.log(myChart);
	myChart.update();
	setInterval((() => {myChart.update();}),5000);
}

render() {
     

    return (
    <canvas ref={this.canvasRef}></canvas>
    )
  }
 
}

