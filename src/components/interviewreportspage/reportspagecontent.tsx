import React from 'react'
import { FaThumbsUp, FaClock, FaComment, FaListOl, FaBook } from 'react-icons/fa';
import { AssociatesFeedbackRequest } from './report-tables/associatesFeedbackRequestComponent.component';
import { Interview24Request } from './report-tables/interview24.component';
import { InterviewJDRequest } from './report-tables/interviewJD.component';
import JDInterviewChart from './report-charts/interviewJD.chart';
import { InterviewPerAssoc } from './report-tables/interviewsPerAssocComponent.component';
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
    title: <><FaListOl /> Interviews Per Associate</>,
    table: <InterviewPerAssoc />,
    chart: <><InterviewCountChart /></>
  },
  {
    title: <><FaComment /> Job Description</>,
    table: <InterviewJDRequest />,
    chart: <JDInterviewChart />
  },
  {
    title: <><FaClock /> 24 Hours Notice</>,
    table: <Interview24Request />,
    chart: <Interview24Chart />
  },
  {
    title: <><FaBook /> Feedback Stats</>,
    table: <FeedbackStatsTable />,
    chart: <FeedbackChart />
  },
  {
    title: <><FaThumbsUp /> Feedback Given</>,
    table: <AssociatesFeedbackRequest />,
    chart: <FeedbackChart />
  }
]