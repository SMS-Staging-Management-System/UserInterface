import * as React from 'react';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Button} from 'reactstrap';
import { IManageCohortsComponentProps } from './manage-cohorts.container';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { cognitoClient } from "../../../axios/sms-clients/cognito-client";
import { addressesClient } from '../../../axios/sms-clients/address-client';
import { ICohort } from '../../../model/cohort';
import { cognitoRoles } from '../../../model/cognito-user.model';

interface IManageCohortsState {
    locations: any[]
    trainers: any[]
    filterDropdownList: boolean
    showFilterSelection: String
    filterDidNotChange: Boolean
    trainerDropdown: {
        isOpen: boolean
        selection: String
    }
    option: String
    optionVar: number
    optionStr: String
    locationDropdown: {
        isOpen: boolean
        selection: String
    }
}

export class ManageCohortsComponenent extends React.Component<IManageCohortsComponentProps, IManageCohortsState> {

    constructor(props: IManageCohortsComponentProps) {
        super(props);
        this.state = {
            filterDropdownList: false,
            showFilterSelection: 'All',
            filterDidNotChange: true,
            locations: [],
            trainers: [],
            option: 'All',
            optionVar: 0,
            optionStr: '',
            trainerDropdown: {
                isOpen: false,
                selection: 'Trainer'
            },
            locationDropdown: {
                isOpen: false,
                selection: 'Location'
            }

        };
    }

    getAllCohorts = async (newPage): Promise<ICohort[]> => {
        const resp = await cohortClient.findAllByPage(newPage);
        const data = await resp.data
        return data
    }

    getCohortsByAddress = async (addressId, newPage): Promise<ICohort[]> => {
        const resp = await cohortClient.findAllByAddressPage(addressId, newPage);
        const data = await resp.data
        return data
    }

    getCohortsByTrainer = async (userId, newPage): Promise<ICohort[]> => {
        const resp = await cohortClient.findAllByTrainerPage(userId, newPage);
        const data = await resp.data
        return data
    }

    getCohortsByOption = async (newPage) => {

        if (this.state.option === 'All') {
            const resp = await cohortClient.findAllByPage(newPage);
            const data = await resp.data
            return data
        }
        else if (this.state.option === 'Location') {
            const resp = await cohortClient.findAllByAddressPage(this.state.optionVar, newPage);
            const data = await resp.data
            return data
        }
        else if (this.state.option === 'Trainer') {
            const resp = await cohortClient.findAllByTrainerPage(this.state.optionStr, newPage);
            const data = await resp.data
            return data
        }

    }

    getTrainersCohorts = async (newPage): Promise<ICohort[]> => {
        const resp = await cohortClient.findAllByPage(newPage);
        const data = await resp.data
        return data
    }

    getLocations = async () => {
        console.log('getting locations?')
        const resp = await addressesClient.findAll();
        const locations = await resp.data;
        console.log(`Locations ${locations}`);
        this.setState({
            ...this.state,
            locations
        });
    }

    getTrainers = async () => {
        const resp = await cognitoClient.findUsersByGroup(cognitoRoles.TRAINER, '');
        const trainers = await resp.data.Users;

        this.setState({
            ...this.state,
            trainers
        });
    }

    async updateTable() {
        const data = await this.getCohortsByOption(this.props.currentPage);
        this.props.updateCohortsByPage(data, this.props.currentPage)
    }

    async componentDidMount() {
        this.updateTable();
        this.getLocations();
        this.getTrainers();
    }

    componentWillReceiveProps() {

        if (this.state.filterDidNotChange === true) {
            this.render();
        }
        else {
            this.updateTable();
            this.setState({
                ...this.state,
                filterDidNotChange: true
            });
        }
    }

    incrementPage = async () => {
        if (this.props.currentPage < this.props.totalPages - 1) {
            const newPage = this.props.currentPage + 1;
            const data = await this.getCohortsByOption(newPage);
            this.props.updateCohortsByPage(data, newPage);
        }
    }

    decrementPage = async () => {
        if (this.props.currentPage > 0) {
            const newPage = this.props.currentPage - 1;
            const data = await this.getCohortsByOption(newPage);
            this.props.updateCohortsByPage(data, newPage);
        }
    }

    resetPage = async () => {
        if (this.props.currentPage > 0) {
            const newPage = 0;
            const data = await this.getCohortsByOption(newPage);
            this.props.updateCohortsByPage(data, newPage);
        }
    }

    displaySingleCohort = (cohort: ICohort) => {
        this.props.toggleViewCohortModal(cohort);
    }

    toggleFilterDropdown = () => {
        this.setState({
            filterDropdownList: !this.state.filterDropdownList
        });
    }

    toggleLocationDropdown = () => {
        this.setState({
            locationDropdown:
            {
                ...this.state.locationDropdown,
                isOpen: !this.state.locationDropdown.isOpen
            }
        });
    }

    toggleTrainerDropdown = () => {
        this.setState({
            trainerDropdown: {
                ...this.state.trainerDropdown,
                isOpen: !this.state.trainerDropdown.isOpen
            }
        });
    }

    setFilterSelection = (filter: String) => {

        this.setState({
            ...this.state,
            showFilterSelection: filter,
            filterDidNotChange: false
        });

        if (filter === '') {
            this.setOption('All', 0,'');
        }

    }

    setOption = (op: String, opv: number, ops: String) => {

        this.resetPage();

        this.setState({
            ...this.state,
            option: op,
            optionVar: opv,
            optionStr: ops,
            filterDidNotChange: false
        })

        this.updateTable();

    }

    showFilterTypeDropdown = () => {
        const instructer = this.state.trainers;
        console.log(instructer);
        let trainers: string[] = [];

        for (let i = 0; i < instructer.length; i++) {
            const currentUser = instructer[i];
            const currentUserEmail = currentUser.Attributes.find((attr: any) => attr.Name === 'email').Value;
            trainers[i] = currentUserEmail;
        }

        if (this.state.showFilterSelection === 'Trainer') {
            return (
                <ButtonDropdown color="success" className="responsive-modal-row-item rev-btn"
                    isOpen={this.state.trainerDropdown.isOpen}
                    toggle={this.toggleTrainerDropdown} display={false}> Trainers:

                    <DropdownToggle className="ml-1" caret>
                        {this.state.trainerDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem onClick={this.getTrainers}>All </DropdownItem>
                        <DropdownItem divider />
                        {
                            trainers.map(trainer => (
                                // {if(this.state.sortTrainer !== 'All') {
                                <DropdownItem
                                    key={'Status-dropdown-' + trainer}
                                onClick={() => this.setOption('Trainer', 0,trainer)}
                                >
                                    {trainer}
                                </DropdownItem>
                                // }
                            ))
                        }
                    </DropdownMenu>
                </ButtonDropdown>


            )
        }
        else if (this.state.showFilterSelection === 'Location') {
            console.log(this.state.locations);
            return (
                <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                    isOpen={this.state.locationDropdown.isOpen} toggle={this.toggleLocationDropdown} > Alias: 

                    <DropdownToggle caret>
                    {this.state.locationDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem onClick={this.getLocations}> </DropdownItem>
                        {/* <DropdownItem divider /> */}
                        {
                            this.state.locations.map(locations => (
                                <DropdownItem
                                    key={'Status-dropdown-' + locations.addressId}
                                    onClick={() => this.setOption('Location', locations.addressId, '')}
                                >
                                    {locations.alias}
                                </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </Dropdown>
            )
        }
        return null;

    }

    render() {

        return (
            <>
                <div id="manage-cohorts-nav" className="rev-background-color">
                    <div id="manage-cohorts-view-selection-container">
                        <div>View By:</div>
                        <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                            isOpen={this.state.filterDropdownList} toggle={this.toggleFilterDropdown}>
                            <DropdownToggle className="ml-1" caret>
                                {this.state.showFilterSelection}

                </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <div onClick={() => this.setFilterSelection('All')}>
                                        All
                                </div>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <div onClick={() => this.setFilterSelection('Trainer')}>
                                        Trainer
                                </div>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <div onClick={() => this.setFilterSelection('Location')}>
                                        Location
                                </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        {this.showFilterTypeDropdown()}


                    </div >
                    <div>
                        <Button className="responsive-modal-row-item rev-btn" onClick={this.props.toggleCreateCohortModal}>New Cohort</Button>
                    </div>
                </div>
                <Table striped >
                    <thead className="rev-background-color">
                        <tr>
                            <th>Cohort Name</th>
                            <th>Location</th>
                            <th>Token</th>
                            <th>Start Month</th>
                            <th>Trainer email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cohorts.map((cohort) =>
                                <tr key={cohort.cohortToken} className="rev-table-row"
                                    onClick={() => this.displaySingleCohort(cohort)}
                                    onMouseEnter={() => this.props.hoveredCohort(cohort)}
                                >
                                    <td>{cohort.cohortName}</td>
                                    <td>{cohort.address ? cohort.address.alias : <td></td>}</td>
                                    <td>{cohort.cohortToken}</td>
                                    <td>{cohort.startDate}</td>
                                    <td>{cohort.trainer ? cohort.trainer.email : <td></td>}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                {(this.props.totalPages > 0) &&
                    (<div className='row horizontal-centering vertical-centering'>
                        <Button variant="button-color" className="rev-background-color div-child" onClick={this.decrementPage}>Prev</Button>
                        <h6 className="div-child text-style" >
                            Page {this.props.currentPage + 1} of {this.props.totalPages}
                        </h6>
                        <Button variant="button-color" className="rev-background-color div-child" onClick={this.incrementPage}>Next</Button>
                    </div>)
                }
            </>
        )
    }
}