import React from 'react';
import Chart from 'chart.js';

interface IChartDisplayProps {

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
      type: 'doughnut',
      data: {
        datasets: [{
          data: [2, 2],         
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 255, 1)',
          ],
        }],
        labels: [
          'Feedback not requested',
          'Feedback requested',
        ],
      },
    });
    if (!myChart) return;
  }

  render() {
    return (
      <canvas  ref={this.canvasRef}></canvas>
    )
  }
}