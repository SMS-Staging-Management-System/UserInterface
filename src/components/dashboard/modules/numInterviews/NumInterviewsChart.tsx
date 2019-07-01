import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

interface INumIntervewsChartProps {
  info: {
    data: {
      labels: string[];
      datasets: {
        label: string[];
        data: number[];
        backgroundColor: string[];
      }[];
    };
    options: {
      title: {
        display: boolean;
        text: string;
        fontSize: number;
      },
      legend: {
        display: boolean;
        position: string;
      },
      maintainAspectRatio: boolean;
      scales: {
        yAxes: {
          ticks: {
            beginAtZero: boolean;
          };
        }[];
      };
    };
  }
}

class NumInterviewsChart extends Component<INumIntervewsChartProps, any> {
  render() {
    const graphStyle = {
      maxWidth: 700,
      height: 350,
      margin: '0 auto',
      padding: 30,
      display: 'inline-block',
    }
    return (
      <div style = {graphStyle} className="summary">
        <Bar data={this.props.info.data} options={this.props.info.options} />
      </div>
    )
  }
}

export default NumInterviewsChart;