import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './NumInterviews.scss'

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
    
    return (
      <div className="graphicContainer">
        <Bar data={this.props.info.data} options={this.props.info.options} />
      </div>
    )
  }
}

export default NumInterviewsChart;