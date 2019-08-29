
import { shallow, mount, render } from 'enzyme';
import { ISurvey } from '../../../model/surveys/survey.model';
import { AllSurveysComponent } from './all-surveys.component';
import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../../../reducers/management';
import { createBrowserHistory } from 'history';
import React, { Fragment, Component } from 'react';

