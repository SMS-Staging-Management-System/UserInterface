import * as React from 'react';
import { ClickerDisplay } from './clicker-display/clicker-display.component';
import { ClickerIncrementer } from './incrementers/clicker-incrementer.component';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps<{}>{
  increment: (amount: number) => void,
  clicks: number
  buyJoke: () => void
}

/**
 * The clicker 
 */
export class ClickerComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ClickerDisplay clicks={this.props.clicks} />
        <ClickerIncrementer
          increment={this.props.increment}
          value={1}
          name="Click!" />
        {(this.props.clicks >= 20) && <ClickerIncrementer
          increment={this.props.increment}
          value={5}
          name="Big Click!" />}
      </div>
    );
  }
}

export default ClickerComponent;