import React from 'react'
import { IJoinCohortProps, JoinCohortComponent } from './join-cohort.component';
import { shallow } from 'enzyme';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

// Test the locations are properly uploaded when clicking on the selector for the location
// For now hard-code the mock data for the join cohort props
const mockProps : IJoinCohortProps = {
    token:"ABCDEFG",
    // tslint:disable-next-line: object-literal-sort-keys
    history:{
        length:1,
        // tslint:disable-next-line: object-literal-sort-keys
        action:'PUSH',
        location:{
            pathname:"hello",
            search:"over here",
            state:{},
            // tslint:disable-next-line: object-literal-sort-keys
            hash:"thisisamockhash"
        },
        push:jest.fn().mockImplementation(),
        replace:jest.fn().mockImplementation(),
        go:jest.fn().mockImplementation(),
        goBack:jest.fn().mockImplementation(),
        goForward:jest.fn().mockImplementation(),
        block:jest.fn().mockImplementation(),
        listen:jest.fn().mockImplementation(),
        createHref:jest.fn().mockImplementation()
    },
    login : { // This test is intended to be done for the case no user is logged in
             // that way, the join cohort sign up is going to be rendered
        currentUser :{
            firstName: "",
            lastName: "",
            // tslint:disable-next-line: object-literal-sort-keys
            email: "",
            roles: []
        }
    },
    joinCohortState : {
        validToken: true,
        // tslint:disable-next-line: object-literal-sort-keys
        userToJoin:{
            userId:0,
            // tslint:disable-next-line: object-literal-sort-keys
            email:"",
            firstName:'',
            lastName:'',
            phoneNumber:'',
            trainingAddress:{
                addressId:0,
                street:'',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:"",
                city:"",
                country:"", 
                state:"", 
                zip:''
            },
            personalAddress:{
                addressId:0,
                street:'',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:"",
                city:"",
                country:"", 
                state:"", 
                zip:''
            },
            userStatus:{
                statusId:0,
                // tslint:disable-next-line: object-literal-sort-keys
                generalStatus:"",
                specificStatus:"",
                virtual:false
            },
            roles:[],
            cohorts:[]
        },
        foundCohort:{
            cohortId:1,
            cohortName:"Mock team",
            // tslint:disable-next-line: object-literal-sort-keys
            cohortDescription:"For unit testing",
            cohortToken:"ABCDEFG",
            address:{
                addressId:0,
                street:'Mock ave',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            startDate:'2019-01-15',
            endDate:'2019-03-15',
            users:[],
            trainer:{
                userId:1,
            // tslint:disable-next-line: object-literal-sort-keys
            email:"mockito@mail.com",
            firstName:'Mock',
            lastName:'Man',
            phoneNumber:'123678',
            trainingAddress:{
                addressId:0,
                street:'Mock ave',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            personalAddress:{
                addressId:0,
                street:'Mock ave',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            userStatus:{
                statusId:0,
                // tslint:disable-next-line: object-literal-sort-keys
                generalStatus:"Mocking",
                specificStatus:"Specifically mocking",
                virtual:false
            },
            roles:['trainer'],
            cohorts:[]
            }
        }
    },
    findCohortByToken:jest.fn().mockImplementation(),
    joinCohort:jest.fn().mockImplementation(),
    updateLocations: jest.fn().mockImplementation(),
    findLoggedInUser: jest.fn().mockImplementation()
};
// Take into consideration the url and what changes when tha user is already logged in
// vs user is completely new in the system.
describe('JoinCohortComponent test',() => {
    test("There are two training locations",()=>{
        // Define the component to be tested with mock props
        const joinCohortPage = shallow(<JoinCohortComponent {...mockProps} />);
        // Test different components within the join cohort component
        // Verify if both of the training locations are properly fetched (Reston and USF)
        expect(joinCohortPage.find(DropdownMenu)).toHaveLength(2);
    });
});