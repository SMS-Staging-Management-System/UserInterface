export const manageUsersTypes = {
  GET_USERS: 'MANAGE_GET_USERS',
}

export const manageGetUsersByRole = (role: string) => (dispatch) => {
  return {
    payload: {
      role
    },
    type: manageUsersTypes.GET_USERS
  }
}

