import React from 'react';
import Chart from 'chart.js';

interface IChartDisplayProps {
  chart:any,
  chartAction:any,
  setCanvas:any
}

export class FeedbackRequestedChartComponent extends React.Component<IChartDisplayProps, any> {
  canvasRef : any;
  
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    var ctx = this.canvasRef.current.getContext('2d');
    let myChart = new Chart(ctx, {
      ...this.props.chart,
      type: 'doughnut',
    });

    if (!myChart) return;
    this.props.chartAction(myChart);
    this.props.setCanvas(myChart);
    setInterval((() => {myChart.update();}),5000);
    myChart.update();
  }

  render() {
    return (
      <canvas  ref={this.canvasRef}></canvas>
    )
  }
}