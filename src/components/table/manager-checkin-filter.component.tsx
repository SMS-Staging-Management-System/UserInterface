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
        <DropdownItem>Current Check-ins</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Historical Check-ins</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}