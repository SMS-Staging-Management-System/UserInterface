import React from 'react'
import { JoinCohortComponent, IJoinCohortProps } from './join-cohort.component';
import { shallow } from 'enzyme';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

// Test the locations are properly uploaded when clicking on the selector for the location
// For now hard-code the mock data for the join cohort props
const mockProps :IJoinCohortProps = {
    token:"ABCDEFG",
    addresses:{
        trainingAddresses:[]
    },
    history:{
        length:1,
        action:'PUSH',
        location:{
            pathname:"hello",
            search:"over here",
            state:{},
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
    login : {
        currentUser :{
            firstName: "Mock first",
            lastName: "Mock last",
            email: "mock@mail.com",
            roles: ["mock"]
        }
    },
    joinCohortState : {
        validToken: true,
        userToJoin:{
            userId:0,
            email:"mockito@mail.com",
            firstName:'Mock',
            lastName:'Man',
            phoneNumber:'123678',
            trainingAddress:{
                addressId:0,
                street:'Mock ave',
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            personalAddress:{
                addressId:0,
                street:'Mock ave',
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            userStatus:{
                statusId:0,
                generalStatus:"Mocking",
                specificStatus:"Specifically mocking",
                virtual:false
            },
            roles:['manager'],
            cohorts:[]
        },
        foundCohort:{
            cohortId:1,
            cohortName:"Mock team",
            cohortDescription:"For unit testing",
            cohortToken:"ABCDEFG",
            address:{
                addressId:0,
                street:'Mock ave',
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
                userId:0,
            email:"mockito@mail.com",
            firstName:'Mock',
            lastName:'Man',
            phoneNumber:'123678',
            trainingAddress:{
                addressId:0,
                street:'Mock ave',
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            personalAddress:{
                addressId:0,
                street:'Mock ave',
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            userStatus:{
                statusId:0,
                generalStatus:"Mocking",
                specificStatus:"Specifically mocking",
                virtual:false
            },
            roles:['trainer'],
            cohorts:[]
            }
        }
    },
    createUser:{
        locationDropdownActive:false,
        roleDropdownActive:false,
        cohortDropdownActive:false,
        enabled:true,
        newUser:{
            email:"mocki@mail.com",
            firstName:"Mockey",
            lastName:"Man",
            phoneNumber:"12368",
            trainingAddress:{
                addressId:0,
                street:'Mock ave',
                alias:"Mocktown",
                city:"Mockland",
                country:"Mocka", 
                state:"MCK", 
                zip:'12678'
            },
            dropdownRole:"associate",
            cohort:{
                cohortId:1,
                cohortName:"Mock team",
                cohortDescription:"For unit testing",
                cohortToken:"ABCDEFG",
                address:{
                    addressId:0,
                    street:'Mock ave',
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
                    userId:0,
                email:"mockito@mail.com",
                firstName:'Mock',
                lastName:'Man',
                phoneNumber:'123678',
                trainingAddress:{
                    addressId:0,
                    street:'Mock ave',
                    alias:"Mocktown",
                    city:"Mockland",
                    country:"Mocka", 
                    state:"MCK", 
                    zip:'12678'
                },
                personalAddress:{
                    addressId:0,
                    street:'Mock ave',
                    alias:"Mocktown",
                    city:"Mockland",
                    country:"Mocka", 
                    state:"MCK", 
                    zip:'12678'
                },
                userStatus:{
                    statusId:0,
                    generalStatus:"Mocking",
                    specificStatus:"Specifically mocking",
                    virtual:false
                },
                roles:['trainer'],
                cohorts:[]
                }
            },
            role:"associate"
        }
    },
    findCohortByToken:jest.fn().mockImplementation(),
    joinCohort:jest.fn().mockImplementation(),
    updateNewUserLocation: jest.fn().mockImplementation(),
    updateNewUser: jest.fn().mockImplementation(),
    updateLocations: jest.fn().mockImplementation(),
    toggleLocationDropdown: jest.fn().mockImplementation(),
    saveUserAssociate: jest.fn().mockImplementation(),
    findLoggedInUser: jest.fn().mockImplementation()
};
// Take into consideration the url and what changes when tha user is already logged in
// vs user is completely new in the system.
describe('JoinCohortComponent',() => {
    test("There are two training locations",()=>{
        // Define the component to be tested with mock props
        const joinCohortPage = shallow(<JoinCohortComponent {...mockProps} />);
        // Test different components within the join cohort component
        // Verify if both of the training locations are properly fetched (Reston and USF)
        expect(joinCohortPage.find(DropdownMenu)).toHaveLength(2);
    });
});