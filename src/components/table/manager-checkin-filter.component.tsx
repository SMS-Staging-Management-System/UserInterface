import * as React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function ManagerCheckinFilterComponent () {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret className="selected-cohort">
        Cohort 1
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem className="cohort-option">Cohort 1</DropdownItem>
        <DropdownItem className="cohort-option">Cohort 2</DropdownItem>
        <DropdownItem className="cohort-option">Cogort 3</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}