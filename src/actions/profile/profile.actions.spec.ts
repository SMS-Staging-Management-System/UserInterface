import { IUser } from "../../model/user.model"
import { updateUser, profileTypes } from "./profile.actions"
import { userClient } from "../../axios/sms-clients/user-client"
import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { cognitoRoles } from "../../model/cognito-user.model";
import { toast } from "react-toastify";
import { updateCurrentSMSUser } from "../current-sms-user/current-sms-user.actions";

// Mock the updateCurrentUser action
jest.mock('../current-sms-user/current-sms-user.actions');
const mockUpdateCurrentSMSUser = updateCurrentSMSUser;

// Mock the toasts
jest.mock('react-toastify')
const mockSuccess: any = toast.success;
const mockWarn: any = toast.warn;
const mockFail: any = toast.error;

// Mock the clients
jest.mock('../../axios/sms-clients/user-client');
const mockedUserClient: any = userClient;
jest.mock('../../axios/sms-clients/cognito-client');
const mockedCognitoClient: any = cognitoClient;

// tslint:disable-next-line: no-big-function
describe('Profile Action tests', () => {
    const mockNewUser: IUser = {
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
        roles: [cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER],
        trainingAddress: {
            addressId: 1,
            alias: 'Reston',
            city: 'Reston',
            // tslint:disable-next-line: no-duplicate-string
            country: 'United States',
            state: 'VA',
            // tslint:disable-next-line: no-duplicate-string
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

    const mockPrevUser: IUser = {
        email: '',
        firstName: '',
        lastName: '',
        personalAddress: {
            addressId: 0,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        phoneNumber: '',
        roles: [],
        trainingAddress: {
            addressId: 0,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        userId: 0,
        userStatus: {
            generalStatus: '',
            specificStatus: '',
            statusId: 0,
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

    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
        mockedCognitoClient.addUserToGroup.mockReturnValue(Promise.resolve({
            // No resolve needed, simply testing if function gets called
        }));
        mockedCognitoClient.removeUserFromGroup.mockReturnValue(Promise.resolve({
            // No resolve needed, simply testing if function gets called
        }));
    })

    it('Should send the updated user information when successful', async () => {
        mockedUserClient.updateSMSUserInfo.mockReturnValue(Promise.resolve({
            data: mockNewUser
        }));

        const action = updateUser(mockNewUser, mockPrevUser);
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            payload: {
                updatedUser: mockNewUser
            },
            type: profileTypes.UPDATE_USER_PROFILE,
        });

        expect(mockSuccess).toHaveBeenCalled();
    })

    mockRoleConfigurations.forEach(configuration => {
        it(`Should add ${configuration.toString()} to the user`, async () => {
            const mockNewUserConfig = {
                ...mockNewUser,
                roles: configuration
            }

            mockedUserClient.updateSMSUserInfo.mockReturnValue(Promise.resolve({
                data: mockNewUserConfig
            }));

            const mockPrevUserConfig = {
                ...mockNewUser,
                roles: []
            }

            const action = updateUser(mockNewUserConfig, mockPrevUserConfig);
            await action(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                payload: {
                    updatedUser: mockNewUserConfig
                },
                type: profileTypes.UPDATE_USER_PROFILE,
            });
        })

        it(`Should remove ${configuration.toString()} from the user`, async () => {
            const mockNewUserConfig = {
                ...mockNewUser,
                roles: configuration
            }

            // tslint:disable-next-line: no-identical-functions
            mockedUserClient.updateSMSUserInfo.mockReturnValue(Promise.resolve({
                data: mockNewUserConfig
            }));

            const action = updateUser(mockNewUserConfig, mockNewUser);
            await action(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                payload: {
                    updatedUser: mockNewUserConfig
                },
                type: profileTypes.UPDATE_USER_PROFILE,
            });
        })
    })

    it('Should send update failed if response has an error', async () => {
        mockedUserClient.updateSMSUserInfo.mockReturnValue(Promise.reject());

        const action = updateUser(mockNewUser, mockPrevUser);
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            payload: {},
            type: profileTypes.UPDATE_USER_PROFILE_FAILED,
        });

        expect(mockFail).toHaveBeenCalled();
    })

    it('Should call the warning toast if the cognito client fails', async () => {
        mockedCognitoClient.addUserToGroup.mockReturnValue(Promise.reject());
        mockedCognitoClient.removeUserFromGroup.mockReturnValue(Promise.reject());

        mockedUserClient.updateSMSUserInfo.mockReturnValue(Promise.resolve({
            data: mockNewUser
        }));

        const action = updateUser(mockNewUser, mockPrevUser);
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            payload: {
                updatedUser: {
                    ...mockNewUser,
                    roles: mockPrevUser.roles
                }
            },
            type: profileTypes.UPDATE_USER_PROFILE,
        });

        expect(mockWarn).toHaveBeenCalled();

        expect(mockSuccess).toHaveBeenCalled();
    })

    it('Should dispatch the updateCurrentSMSUser action if the currentUser flag is set', async () => {
        mockedUserClient.updateSMSUserInfo.mockReturnValue(Promise.resolve({
            data: mockNewUser
        }));

        const action = updateUser(mockNewUser, mockPrevUser, true);
        await action(dispatch);

        expect(mockUpdateCurrentSMSUser).toHaveBeenCalled();

        expect(dispatch).toHaveBeenCalledWith({
            payload: {
                updatedUser: mockNewUser
            },
            type: profileTypes.UPDATE_USER_PROFILE,
        });

        expect(mockSuccess).toHaveBeenCalled();
    })
})