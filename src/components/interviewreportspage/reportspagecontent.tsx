import React from 'react'
import { FaThumbsUp, FaClock, FaComment, FaListOl } from 'react-icons/fa';
import { AssociatesFeedbackRequest } from '../associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component';
import { Interview24Request } from '../interview24/interview24.component';
import { InterviewJDRequest } from '../interviewJD/interviewJD.component';
import JDInterviewChart from './report-charts/interviewJD.chart';
import { InterviewPerAssoc } from '../interviewsPerAssocComponent/interviewsPerAssocComponent.component';
import Interview24Chart from './report-charts/interview24.chart'
import FeedbackChart from './report-charts/feedback.chart';

interface IPageItem {
  title: any
  table: any
  chart: any
}

export const pageContent: IPageItem[] = [
  {
    title: <><FaThumbsUp /> Feedback Given</>,
    table: <AssociatesFeedbackRequest />,
    chart: <FeedbackChart />
  },
  {
    title: <><FaClock /> 24 Hours Notice Given</>,
    table: <Interview24Request />,
    chart: <Interview24Chart />
  },
  {
    title: <><FaComment /> Job Description Given</>,
    table: <InterviewJDRequest />,
    chart: <JDInterviewChart />
  },
  {
    title: <><FaListOl /> Interviews Per Associate</>,
    table: <InterviewPerAssoc />,
    chart: <><h4>There is not available visual data for this report</h4>
      <InterviewPerAssoc />
    </>
  }
]