import React from 'react'
import Profile, {inputNames}  from './profile.component';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme';
import { IProfileProps } from './profile.container';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props: IProfileProps = {
        locationDropdownActive: false,
        bUserInfoChanged: false,
        updateUserInfo: jest.fn(),
        setToCurrentSMSUser: jest.fn(),
        updateUser: jest.fn(),
        updateUserTrainingLocation: jest.fn(),
        toggleTrainingLocationsDropdown: jest.fn(),
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
            status: {
              statusId: 0,
              genericStatus: '',
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
            status: {
              statusId: 0,
              genericStatus: '',
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
          ]}
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
