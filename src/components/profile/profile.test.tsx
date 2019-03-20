import React from 'react'
import Profile, {inputNames}  from './profile.component';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme';
import { IProfileProps } from './profile.container';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props: IProfileProps = {
        locationDropdownActive: false,
        statusDropdownActive: false,
        bUserInfoChanged: false,
        virtual: false,
        updateUserInfo: jest.fn(),
        setToCurrentSMSUser: jest.fn(),
        updateUser: jest.fn(),
        updateUserTrainingLocation: jest.fn(),
        updateUserStatus: jest.fn(),
        toggleTrainingLocationsDropdown: jest.fn(),
        toggleStatusDropdown: jest.fn(),
        handleCheckboxChange: jest.fn(),
        currentSMSUser:  {
            trainingAddress: {
              addressId: 0,
              street: '',
              alias: '',
              city: '',
              country: '',
              state: '',
              zip: '',
            },
            personalAddress: {
              addressId: 0,
              street: '',
              alias: '',
              city: '',
              country: '',
              state: '',
              zip: '',
            },
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            userId: 0,
            roles: [],
            userStatus: {
              statusId: 0,
              generalStatus: '',
              specificStatus: '',
              virtual: false
            }
          },
          userToView:  {
            trainingAddress: {
              addressId: 0,
              street: '',
              alias: '',
              city: '',
              country: '',
              state: '',
              zip: '',
            },
            personalAddress: {
              addressId: 0,
              street: '',
              alias: '',
              city: '',
              country: '',
              state: '',
              zip: '',
            },
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            userId: 0,
            roles: [],
            userStatus: {
              statusId: 0,
              generalStatus: '',
              specificStatus: '',
              virtual: false
            }
          },
          trainingAddresses: {
              trainingAddresses: [
              {
                addressId: 1,
                street: '',
                alias: 'USF',
                city: '',
                state: '',
                country: '',
                zip: ''
              },
              {
                addressId: 2,
                street: '',
                alias: 'Reston',
                city: '',
                state: '',
                country: '',
                zip: ''
              }
          ]},
        allStatus:{
          userStatus: [
            {
              statusId: 1,
              generalStatus: 'Training',
              specificStatus: 'Dropped',
              virtual: false
            },
            {
              statusId: 2,
              generalStatus: 'Training',
              specificStatus: 'Training',
              virtual: false
            },
            {
              statusId: 3,
              generalStatus: 'Training',
              specificStatus: 'Complete',
              virtual: false
            },
            {
              statusId: 4,
              generalStatus: 'Staging',
              specificStatus: 'Staging',
              virtual: false
            },
            {
              statusId: 5,
              generalStatus: 'Staging',
              specificStatus: 'Bench',
              virtual: false
            },
            {
              statusId: 6,
              generalStatus: 'Staging',
              specificStatus: 'Waiting for Paperwork',
              virtual: false
            },
            {
              statusId: 7,
              generalStatus: 'Staging',
              specificStatus: 'Confirmed',
              virtual: false
            },
            {
              statusId: 8,
              generalStatus: 'Staging',
              specificStatus: 'Project Started',
              virtual: false
            },
            {
              statusId: 9,
              generalStatus: 'Staging',
              specificStatus: 'Paused',
              virtual: false
            },
            {
              statusId: 10,
              generalStatus: 'Staging',
              specificStatus: 'Panel Pending',
              virtual: false
            },
            {
              statusId: 11,
              generalStatus: 'Staging',
              specificStatus: 'Staging',
              virtual: true
            },
            {
              statusId: 12,
              generalStatus: 'Staging',
              specificStatus: 'Bench',
              virtual: true
            },
            {
              statusId: 13,
              generalStatus: 'Staging',
              specificStatus: 'Waiting for Paperwork',
              virtual: true
            },
            {
              statusId: 14,
              generalStatus: 'Staging',
              specificStatus: 'Confirmed',
              virtual: true
            },
            {
              statusId: 15,
              generalStatus: 'Staging',
              specificStatus: 'Project Started',
              virtual: true
            },
            {
              statusId: 16,
              generalStatus: 'Staging',
              specificStatus: 'Paused',
              virtual: true
            },
            {
              statusId: 17,
              generalStatus: 'Staging',
              specificStatus: 'Panel Pending',
              virtual: true
            }
          ]
        }

    }

    return props;
}

const props = setup();


describe("rendering the user's profile", () => {
    it('renders something', () => {
        shallow(<Profile {...props}/>)
    })

    it('renders exactly one input field for email', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.EMAIL}"]`);

        expect(testInputField).toHaveLength(1);
    })

    it('renders exactly one input field for first name', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.FIRST_NAME}"]`);

        expect(testInputField).toHaveLength(1);
    })

    it('renders exactly one input field for last name', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.LAST_NAME}"]`);

        expect(testInputField).toHaveLength(1);
    })

    it('renders exactly one input field for phone number', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.PHONE}"]`);

        expect(testInputField).toHaveLength(1);
    })

    it('renders exactly one input field for street', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.STREET}"]`);

        expect(testInputField).toHaveLength(1);
    })

    it('renders exactly one input field for city', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.CITY}"]`);

        expect(testInputField).toHaveLength(1);
    })
    
    it('renders exactly one input field for state', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.STATE}"]`);

        expect(testInputField).toHaveLength(1);
    })

    it('renders exactly one input field for zip code', () => {
        const tester = shallow(<Profile {...props}/>)

        const testInputField = tester.find(`[name="${inputNames.ZIP}"]`);

        expect(testInputField).toHaveLength(1);
    })

    // it('allows the user to select from all possible training locations'), () => {
    //     const tester = shallow(<Profile {...props} />);

    //     const testInputDropdown = tester.find(`[name="${inputNames.TRAINING_ALIASES}]`)

    //     props.trainingAddresses.trainingAddresses.map(address => {

    //     })

    // }

})
