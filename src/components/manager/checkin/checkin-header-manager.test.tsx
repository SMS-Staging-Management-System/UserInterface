import * as React from 'react';
import { shallow } from "enzyme";
import CheckInHeaderManagerComponent from './check-in-header-manager.component';

describe('<ClockComponent />', () => {
  const filler: any = null;
  it ('renders one <ClockComponent />', () => {
    const wrapper = shallow(<CheckInHeaderManagerComponent {...filler}/>);
    expect(wrapper.find(CheckInHeaderManagerComponent)).toBeTruthy();
  })
})