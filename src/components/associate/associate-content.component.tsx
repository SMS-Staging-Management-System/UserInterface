import * as React from 'react';
import { Button } from 'reactstrap';
import AssociateTable from './associate-table.component';
import AssociateCheckInSubmit from './associate-checkin.component';
import ClockComponent from '../clock/clock.component';
interface IState {
	isCheckingIn: boolean;
}

export class AssociateContentComponent extends React.Component<{}, IState>{
	
	constructor(props: any) {
		super(props);
		this.state = {
			isCheckingIn: false
		}
	}

	public handleCheckInClick = () => {
		this.setState({ isCheckingIn: true });
	}

	public handleSubmitClick = () => {
		this.setState({ isCheckingIn: false });
	}

	public Switch = (props) => {
		if (this.state.isCheckingIn) {
			return <AssociateCheckInSubmit />
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

	public render() {
		const { isCheckingIn } = this.state;
		let button;

		// switch logic
		if (isCheckingIn) {
			button = <this.UpdateButton onClick={this.handleSubmitClick} />;
		} else {
			button = <this.CheckInButton onClick={this.handleCheckInClick} />;
		}

		return (
			<div id="associate-content-wrapper">
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