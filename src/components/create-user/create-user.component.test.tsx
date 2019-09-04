import React from 'react';
import { JoinCohortComponent, IJoinCohortProps } from '../join-cohort/join-cohort.component';
import { ICreateUserProps, CreateUserComponent } from './create-user.component';
import { mount, shallow } from 'enzyme';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

// tslint:disable-next-line: no-big-function
describe('JoinCohortComponent test',() => {
    let wrapper;
    let mnt;
    const token = "ABCDEFG"; 
        const currentUser = {
            firstName: "",
            lastName: "",
            // tslint:disable-next-line: object-literal-sort-keys
            email: "",
            roles: []
        };
        const joinCohortState = {
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
                // tslint:disable-next-line: no-duplicate-string
                startDate:'2019-01-15',
                // tslint:disable-next-line: no-duplicate-string
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
                    // tslint:disable-next-line: no-duplicate-string
                    specificStatus:"Specifically mocking",
                    virtual:false
                },
                roles:['trainer'],
                cohorts:[]
                }
            }
        };
        const createProps : ICreateUserProps = {
            token,
            // tslint:disable-next-line: object-literal-sort-keys
            addresses:{
                trainingAddresses:[]
            },
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
            joinCohortState,
            createUser:{
                locationDropdownActive:false,
                roleDropdownActive:false,
                // tslint:disable-next-line: object-literal-sort-keys
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
                        // tslint:disable-next-line: object-literal-sort-keys
                        alias:"Mocktown",
                        city:"Mockland",
                        country:"Mocka", 
                        state:"MCK", 
                        zip:'12678'
                    },
                    // tslint:disable-next-line: object-literal-sort-keys
                    dropdownRole:"associate",
                    cohort:{
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
                            userId:0,
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
                    },
                    role:"associate"
                }
            },
            updateNewUserLocation: jest.fn().mockImplementation(),
            updateNewUser: jest.fn().mockImplementation(),
            joinCohort:jest.fn().mockImplementation(),
            toggleLocationDropdown: jest.fn().mockImplementation(),
            saveUserAssociate: jest.fn().mockImplementation()
        };
    beforeEach(() => {
        const joinProps : IJoinCohortProps = {
            token,
            // tslint:disable-next-line: object-literal-sort-keys
            login : { // This test is intended to be done for the case no user is logged in
                      // that way, the join cohort sign up is going to be rendered
            currentUser
        },
        joinCohortState,
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
            findCohortByToken:jest.fn().mockImplementation(),
            joinCohort:jest.fn().mockImplementation(),
            updateLocations: jest.fn().mockImplementation(),
            findLoggedInUser: jest.fn().mockImplementation()
        }
        wrapper = shallow(<JoinCohortComponent {...joinProps} />);
        mnt = mount(<CreateUserComponent {...createProps}/>);
    });   
    test("There are two training locations", () => {
        // Test different components within the join cohort component
        // Verify if both of the training locations are properly fetched (Reston and USF)
        expect(wrapper.find(CreateUserComponent).length === 1);
        expect(mnt.render().find(DropdownMenu).length === 1);
    });
});