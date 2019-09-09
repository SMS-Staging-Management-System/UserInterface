import { shallow } from "enzyme";
import React from 'react';
import { Input } from "reactstrap";
import { cognitoRoles } from "../../model/cognito-user.model";
import { IUser } from "../../model/user.model";
import { IRoleSelectorProps, RoleSelector } from "./role.selector";
import { inputNames } from "./profile.component";

describe('<SCRoleSelector />', () => {
    let mockProps: IRoleSelectorProps;
    const mockUser: IUser = {
        email: 'email@email.com',
        firstName: 'First',
        lastName: "Last",
        personalAddress: {
            addressId: 0,
            alias: 'tstr',
            city: 'Laramie',
            country: 'USA',
            state: 'Wyoming',
            street: '123 Street St',
            zip: '82070'
        },
        phoneNumber: '8675309',
        roles: [],
        trainingAddress: {
            addressId: 1,
            alias: 'Reston',
            city: 'Reston',
            country: 'United States',
            state: 'VA',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
        },
        userId: 0,
        userStatus: {
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            statusId: 4,
            virtual: false
        },
    }
    const mockAdminUser: IUser = {
        ...mockUser,
        roles: [cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER],
        userStatus: {
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            statusId: 8,
            virtual: false
        },
    }
    const mockRoleConfigurations: string[][] = [
        [],
        [cognitoRoles.TRAINER],
        [cognitoRoles.STAGING_MANAGER],
        [cognitoRoles.ADMIN],
        [cognitoRoles.TRAINER, cognitoRoles.STAGING_MANAGER],
        [cognitoRoles.TRAINER, cognitoRoles.ADMIN],
        [cognitoRoles.STAGING_MANAGER, cognitoRoles.ADMIN],
        [cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]
    ]
    const checkboxValues = [
        'associate',
        cognitoRoles.TRAINER,
        cognitoRoles.STAGING_MANAGER,
        cognitoRoles.ADMIN
    ]

    beforeEach(() => {
        mockProps = {
            currentSMSUser: {
                ...mockUser
            },
            onChangeHandler: jest.fn(),
            updateUser: {
                ...mockUser
            },
        }
    })

    it('Should render the component as a disabled input if the current user is an associate.', () => {
        const component = shallow(<RoleSelector {...mockProps} />);
        expect(component).toBeDefined();
        const input = component.find(Input).find(`[name="${inputNames.ROLES}"]`).find(`[value="Associate"]`).find('[disabled=true]');
        expect(input).toHaveLength(1);
    })

    mockRoleConfigurations.forEach(configuration => {
        const mockUpdateUser: IUser = {
            ...mockUser,
            roles: configuration
        }

        if (configuration.length === 0) {
            configuration = ['associate']
        }

        it(`Should render the component with ${configuration} option(s) checked`, () => {
            const component = shallow(<RoleSelector {...{ ...mockProps, currentSMSUser: mockAdminUser, updateUser: mockUpdateUser }} />);
            expect(component).toBeDefined();
            const inputs = component.find(Input).find(`[name="${inputNames.ROLES}"]`);
            expect(inputs).toHaveLength(4);
            checkboxValues.forEach(checkbox => {
                const checked = configuration.includes(checkbox);
                const box = inputs.find(`[value="${checkbox}"]`).find(`[checked=${checked}]`);
                expect(box).toHaveLength(1);
            })
        })
    })

    it('Should call the prop function with the proper event when changed.', () => {
        const component = shallow(<RoleSelector {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const inputs = component.find(Input).find(`[name="${inputNames.ROLES}"]`);
        expect(inputs).toHaveLength(4);
        checkboxValues.forEach(checkbox => {
            const box = inputs.find(`[value="${checkbox}"]`);
            const simulatedEvent = {
                target: {
                    name: inputNames.ROLES,
                    value: checkbox
                }
            }
            box.simulate('change', simulatedEvent);
            expect(mockProps.onChangeHandler).toHaveBeenCalledWith(simulatedEvent);
        })
    })
})