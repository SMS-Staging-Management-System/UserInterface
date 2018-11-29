import { shallow } from "enzyme";
import * as React from 'react';
import { ClickerDisplay } from "./clicker-display.component";

describe('<ClickerDisplay />', () => {
  const nonMultiplesOf5 = [1, 2, 3, 4, 6, 24, 88, 103, 100003];
  nonMultiplesOf5.forEach(testNumber => {
    it(`renders the display with color red for number ${testNumber}`, () => {
      const wrapper = shallow(<ClickerDisplay clicks={testNumber} />);
      const element = wrapper.find('#click-display');
      expect(element.hasClass('red')).toEqual(true);
    })
  })

  const multiplesOf5 = [5, 150, 2000, 205, 335]
  multiplesOf5.forEach(testNumber => {
    it(`render the diplay with color blue for number ${testNumber}` ,() => {
      const wrapper = shallow(<ClickerDisplay clicks={testNumber} />);
      const element = wrapper.find('#click-display');
      expect(element.hasClass('blue')).toEqual(true);
    })
  })
  

})