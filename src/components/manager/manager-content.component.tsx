import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { ContainerComponent } from './manager.container';
import ClockComponent from '../../components/clock/clock.component';
import * as managerActions from '../../actions/manager/manager.actions';

// interface IComponentProps {
//   managerInit: () => { void }
// }

export class ManagerContentComponent extends React.Component<any, any, any> {

  public componentDidMount() {
    this.props.managerInit();
  }

  public render() {
    return (
      <div className="manager-content col-12 shadow-lg p-3 mb-5 bg-white rounded">
       <div>
          <h4>SMS Manager Dashboard <ClockComponent/></h4>
        </div>
       <hr id="hr-tag"></hr>
        <div>
          <ContainerComponent/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.manager)
const mapDispatchToProps = {
  ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagerContentComponent)