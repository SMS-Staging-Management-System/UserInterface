import * as React from 'react';
import { shallow } from "enzyme";
import ClockComponent from '../../components/clock/clock.component';

describe('<ClockComponent />', () => {
  const filler: any = null;
  it ('renders one <ClockComponent />', () => {
    const wrapper = shallow(<ClockComponent {...filler}/>);
    expect(wrapper.find(ClockComponent)).toBeTruthy();
  })
})