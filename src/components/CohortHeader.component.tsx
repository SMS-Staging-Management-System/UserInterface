import * as React from 'react';
import '../include/bootstrap';

/**
 * Header Cohort Popup
 */
export class CohortHeaderComponent extends React.PureComponent<any, {}, {}>{

	public render(){
		return(
			<>
				<div className="col-md-6">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title">Cohort Invitee Email</h5>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-row ml-auto">
									<div className="form-group col">
										<input type="email" className="form-control" placeholder="@Enter Email" />
									</div>
									<div className="col-md-2">
										<button type="button" className="btn btn-danger"> Send </button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		)
	}
}