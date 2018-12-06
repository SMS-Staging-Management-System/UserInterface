import * as React from 'react';

interface IProps {
  clicks: number;
}

export class ClickerDisplay extends React.Component<IProps, {}> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { clicks } = this.props;
    return (
      <p id="click-display" className={(clicks % 5 === 0) ? 'blue' : 'red'}> 
        clicks: {clicks} 
      </p>
    )
  }
}
