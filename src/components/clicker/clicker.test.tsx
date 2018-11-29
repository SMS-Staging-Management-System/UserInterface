import * as React from 'react';
import { shallow } from "enzyme";
import { ClickerComponent } from "./clicker.component";
import { ClickerDisplay } from "./clicker-display/clicker-display.component";
import { ClickerIncrementer } from './incrementers/clicker-incrementer.component';

describe('<ClickerComponent />', () => {
  const filler: any = null;
  it ('renders one <ClickerDisplayComponent />', () => {
    const wrapper = shallow(<ClickerComponent {...filler}/>);
    expect(wrapper.find(ClickerDisplay)).toHaveLength(1);
  })

  it ('renders one <ClickerIncrementer />', () => {
    const mockProps: any = {
      clicks: 19
    }
    const wrapper = shallow(
      <ClickerComponent 
        {...mockProps}
        />);
    expect(wrapper.find(ClickerIncrementer)).toHaveLength(1);
  })

  it ('renders two <ClickerIncrementer />', () => {
    const mockProps: any = {
      clicks: 20
    }
    const wrapper = shallow(
      <ClickerComponent 
        {...mockProps}/>);
    expect(wrapper.find(ClickerIncrementer)).toHaveLength(2);
  })
})