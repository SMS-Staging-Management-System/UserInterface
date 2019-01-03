export const manageUsersTypes = {
  GET_USERS: 'MANAGE_GET_USERS',
}

export const getUsers = (roles: string[]) => {
  return {
    payload: {
      roles
    },
    type: manageUsersTypes.GET_USERS
  }
}

