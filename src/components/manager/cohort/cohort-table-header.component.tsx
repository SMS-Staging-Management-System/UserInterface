import * as React from 'react';
import '../../../include/bootstrap';

/**
 * Header Cohort Popup
 */
export class CohortTableHeaderComponent extends React.PureComponent<any, {}, {}>{

	public render(){
		return(
			<>
			<thead className="checkin-table-header">
			  <tr>
				<th scope="col">Cohort</th>
				<th scope="col"># of Associates</th>
			  </tr>
			</thead>
		  </>
		)
	}
}

export default CohortTableHeaderComponent