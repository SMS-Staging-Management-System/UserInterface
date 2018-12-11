import * as React from 'react';
import time from '../../include/time';
 /**
  * The clock component, nothing special here
  */
interface IState {
    time: string
  }
 export class ClockComponent extends React.Component<{},IState> {
  constructor(props) {
    super(props);
      this.state = {
        time: ''
      };
  }

  public setTime = () => {
    const d = Date.now()
      this.setState({
        time: time(d)
      })
  }
  public componentDidMount(){
    setInterval(()=>{
      this.setTime()
    },1000)
  }
  public render() {
    return (
     <>
     <p id="clock">
       {this.state.time}
     </p>
     </>
    );
  }
}
 export default ClockComponent; 