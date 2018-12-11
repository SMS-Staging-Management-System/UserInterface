import * as React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function ManagerCheckinFilterComponent () {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        Data Filter
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Filter Check-ins </DropdownItem>
        <DropdownItem>Date</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Cohort</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}