import * as React from 'react';
import { Button } from 'reactstrap';
import AssociateTable from './associate-table.component';
import AssociateCheckInSubmit from './associate-checkin.component';
import ClockComponent from '../clock/clock.component';
import { IState } from '../../reducers/index';
import { connect } from 'react-redux';
import * as associateActions from '../../actions/associate/associate.actions'
import { IUser } from 'src/model/User.model';
interface IComponentState {
	isCheckingIn: boolean
	isInit: boolean
}

interface IComponentProps {
	user: IUser
	associateInit: (userId: number) => void
}


export class AssociateContentComponent extends React.Component< IComponentProps, IComponentState>{
	
	constructor(props: any) {
		super(props);
		this.state = {
			isCheckingIn: false,
			isInit: false
		}
	}

	public componentDidMount() {
		//
	}

	public handleCheckInClick = () => {
		this.setState({ isCheckingIn: true });
	}

	public handleSubmitClick = () => {
		this.setState({ isCheckingIn: false });
	}

	public Switch = (props) => {
		if (this.state.isCheckingIn) {
			return <AssociateCheckInSubmit handleSubmitClick={this.handleSubmitClick.bind(this)} />
		}
		return <AssociateTable />
	};

	public UpdateButton = (props) => {
		return (
			<Button 
				id="btn-right" 
				className="btn btn-danger" 
				onClick={props.onClick}>
				Return
			</Button>
		);
	}

	public CheckInButton = (props) => {
		return (
			<Button 
				id="btn-right" 
				className="btn btn-danger" 
				data-dismiss="modal" 
				onClick={props.onClick}>
				Check In
			</Button>
		);
	}

	public initAssociate = () => {
		this.props.associateInit(this.props.user.userId);
		this.setState({
			isInit: true
		})
	}

	public render() {
		const { isCheckingIn } = this.state;
		let button;

		// switch logic
		if (isCheckingIn) {
			button = <this.UpdateButton onClick={this.handleSubmitClick} />;
		} else {
			button = <this.CheckInButton onClick={this.handleCheckInClick} />;
		}

		if(this.props.user && !this.state.isInit) {
			this.initAssociate();
		}
		

		return (
			
			<div className="container-fluid" id="associate-content-wrapper">
				<div id="associate-content">
					<div id="associate-content-header">
						<h4 
							id="associate-content-title"
							>Associate Dashboard <ClockComponent /></h4>
							{button}
					</div>
					<div 
						id="associate-content-main"
						>
						<this.Switch isLoggedIn={isCheckingIn} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: IState) => state.user
const mapDispatchToProps = {
  ...associateActions
}
export default connect(mapStateToProps, mapDispatchToProps)(AssociateContentComponent)