import React from 'react'
import { FaThumbsUp, FaClock, FaComment, FaListOl, FaBook } from 'react-icons/fa';
import { AssociatesFeedbackRequest } from './report-tables/associatesFeedbackRequestComponent.component';
import { Interview24Request } from './report-tables/interview24.component';
import { InterviewJDRequest } from './report-tables/interviewJD.component';
import JDInterviewChart from './report-charts/interviewJD.chart';
import { InterviewPerAssoc } from '../interviewsPerAssocComponent/interviewsPerAssocComponent.component';
import Interview24Chart from './report-charts/interview24.chart'
import FeedbackChart from './report-charts/feedback.chart';
import { FeedbackStatsTable } from './report-tables/feedbackStats.component';
import InterviewCountChart from './report-charts/interviewcount.chart';

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
    chart: <><InterviewCountChart /></>
  },
  {
    title: <><FaBook /> Feedback Stats</>,
    table: <FeedbackStatsTable />,
    chart: <FeedbackChart />
  }
]