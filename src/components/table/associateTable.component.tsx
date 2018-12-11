import * as React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { IState } from 'src/reducers';

/**
 * The table to render a list of associate
 */
export class AssociateTableComponent extends React.Component {
  public render() {
    return (
      <>
        <Table className="table table-hover table-bordered" id="rowboxthing2">
        
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.associate)
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(AssociateTableComponent)