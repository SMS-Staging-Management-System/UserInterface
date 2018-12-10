import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IStateProps {
  isLoading: boolean;
}

/**
 * The loading screen the user can enjoy while waiting for resoures
 */
export class LoadingComponent extends React.Component<IStateProps> {

  public render() {
    console.log(this.props.isLoading)
    return (
      <>
        {
          this.props.isLoading &&
          <div id="loading-screen" >
            <img src={require('../../assets/LoadingLogo.gif')} alt="loading revature"/>
          </div>
        }
      </>
    );
  }
};

const mapStateToProps = (state: IState) => (state.loading)
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent)