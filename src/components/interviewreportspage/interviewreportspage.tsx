import React, { Component } from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import Card from 'reactstrap/lib/Card';
import { pageContent } from './reportspagecontent';


export class ReportsPage extends Component {

  state = {
    report: 0,
    table: true
  }

  changeReport = (index: number) => () => {
    this.setState({
      ...this.state,
      report: index
    })
  }

  changeReportType = () => {
    this.setState({
      ...this.state,
      table: !this.state.table
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="3">
            <h2>Reports</h2>
          </Col>
          <Col xs="9">
            <button className="btn btn-lg btn-primary btn-block" onClick={() => this.changeReportType()}>
              {this.state.table ? 'Visual Data' : 'Form Data'}
            </button>
          </Col>
        </Row>
        <Row>
          <Col xs="3">
            <Card outline color="secondary">
              <ListGroup>
                {pageContent.map((report, index) => (
                  <ListGroupItem
                    tag="button"
                    active={this.state.report === index}
                    onClick={this.changeReport(index)}
                    key={index}>
                    {report.title}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col xs="9">
            {this.state.table ?
              pageContent[this.state.report].table :
              pageContent[this.state.report].chart
            }
          </Col>
        </Row>
      </Container>
    )
  }
}
