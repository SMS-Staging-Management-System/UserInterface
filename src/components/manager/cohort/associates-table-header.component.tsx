import * as React from 'react';
import '../../../include/bootstrap';

/**
 * Associates table headers
 */
export class AssociatesTableHeaderComponent extends React.PureComponent<any, {}, {}>{

	public render(){
		return(
			<>
			<thead className="checkin-table-header">
			  <tr>
				<th scope="col">ID</th>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Email</th>
			  </tr>
			</thead>
		  </>
		)
	}
}

export default AssociatesTableHeaderComponent