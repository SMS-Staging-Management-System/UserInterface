import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { increment } from '../../actions/clicker/clicker.actions'
import { ClickerComponent } from './clicker.component';


const mapStateToProps = (state: IState) => (state.managementState.clicker);

const mapDispatchToProps = {
  increment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClickerComponent);