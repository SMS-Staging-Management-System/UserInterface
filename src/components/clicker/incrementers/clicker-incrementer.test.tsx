import { shallow } from "enzyme";
import * as React from 'react';
import { ClickerIncrementer } from "./clicker-incrementer.component";

describe('<ClickerIncrementer />', () => {
    it(`renders the button and calls the function when clicked`, () => {
      const value = 5;
      const onclick = jest.fn();
      const wrapper = shallow(
          <ClickerIncrementer 
            name="test" 
            value={value} 
            increment={onclick} />
          );
      const buttons = wrapper.find('.btn');
      expect(buttons).toHaveLength(1);

      buttons.first().simulate('click');
      expect(onclick).toBeCalledWith(value);     
    })


    it(`works when clicked multiple times`, () => {
      const value = 5;
      const onclick = jest.fn();
      const wrapper = shallow(
          <ClickerIncrementer 
            name="test" 
            value={value} 
            increment={onclick} />
          );
      const buttons = wrapper.find('.btn');
      expect(buttons).toHaveLength(1);

      buttons.first().simulate('click');
      buttons.first().simulate('click');
      buttons.first().simulate('click');
      buttons.first().simulate('click');
      expect(onclick).toHaveBeenCalledTimes(4);     
    })
  

})