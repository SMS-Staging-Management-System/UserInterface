import React from 'react';
import { JoinCohortComponent, IJoinCohortProps } from '../join-cohort/join-cohort.component';
import { ICreateUserProps, CreateUserComponent } from './create-user.component';
import { mount, shallow } from 'enzyme';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

describe('JoinCohortComponent test',() => {
    let wrapper;
    let mnt;
    const token = "ABCDEFG"; 
        const currentUser = {
            firstName: "",
            lastName: "",
            email: "",
            roles: []
        };
        const joinCohortState = {
            validToken: true,
            userToJoin:{
                userId:0,
                email:"",
                firstName:'',
                lastName:'',
                phoneNumber:'',
                trainingAddress:{
                    addressId:0,
                    street:'',
                    alias:"",
                    city:"",
                    country:"", 
                    state:"", 
                    zip:''
                },
                personalAddress:{
                    addressId:0,
                    street:'',
                    alias:"",
                    city:"",
                    country:"", 
                    state:"", 
                    zip:''
                },
                userStatus:{
                    statusId:0,
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
                    userId:1,
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
        };
        const createProps : ICreateUserProps = {
            token,
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
            joinCohortState,
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
            updateNewUserLocation: jest.fn().mockImplementation(),
            updateNewUser: jest.fn().mockImplementation(),
            toggleLocationDropdown: jest.fn().mockImplementation(),
            saveUserAssociate: jest.fn().mockImplementation()
        };
    beforeEach(() => {
        const joinProps : IJoinCohortProps = {
            token,
            login : { // This test is intended to be done for the case no user is logged in
                      // that way, the join cohort sign up is going to be rendered
            currentUser
        },
        joinCohortState,
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