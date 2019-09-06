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
        userId: 0,
        firstName: 'First',
        lastName: "Last",
        phoneNumber: '8675309',
        trainingAddress: {
            addressId: 1,
            alias: 'Reston',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
            city: 'Reston',
            state: 'VA',
            country: 'United States'
        },
        personalAddress: {
            addressId: 0,
            street: '123 Street St',
            alias: 'tstr',
            city: 'Laramie',
            country: 'USA',
            state: 'Wyoming',
            zip: '82070'
        },
        userStatus: {
            statusId: 4,
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            virtual: false
        },
        roles: []
    }
    const mockAdminUser: IUser = {
        ...mockUser,
        userStatus: {
            statusId: 8,
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            virtual: false
        },
        roles: [cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]
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
            updateUser: {
                ...mockUser
            },
            onChangeHandler: jest.fn()
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