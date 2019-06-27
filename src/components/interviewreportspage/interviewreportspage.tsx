import React, { Component } from 'react'
import { AssociatesFeedbackRequest } from '../associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component';
import { Interview24Request } from '../interview24/interview24.component';
import { InterviewJDRequest } from '../interviewJD/interviewJD.component';
import { InterviewPerAssoc } from '../interviewsPerAssocComponent/interviewsPerAssocComponent.component';
import { Container, ListGroup } from 'react-bootstrap';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { FaThumbsUp, FaClock, FaComment, FaListOl } from 'react-icons/fa';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import FeedbackReportForm from '../associatesFeedbackRequestComponent/ReportFormComponent';
import ReportForm from '../report-form/ReportFormComponent';
import JDReportForm from '../interviewJD/ReportFormComponent';
import Card from 'reactstrap/lib/Card';

interface IPageItem {
  title: any
  table: any
  chart: any
}

const pageContent: IPageItem[] = [
  {
    title: <><FaThumbsUp /> Feedback Given</>,
    table: <AssociatesFeedbackRequest />,
    chart: <FeedbackReportForm />
  },
  {
    title: <><FaClock /> 24 Hours Notice Given</>,
    table: <Interview24Request />,
    chart: <ReportForm />
  },
  {
    title: <><FaComment /> Job Description Given</>,
    table: <InterviewJDRequest />,
    chart: <JDReportForm />
  },
  {
    title: <><FaListOl /> Interviews Per Associate</>,
    table: <InterviewPerAssoc />,
    chart: <><h4>There is not available visual data for this report</h4>
      <InterviewPerAssoc />
    </>
  }
]

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
