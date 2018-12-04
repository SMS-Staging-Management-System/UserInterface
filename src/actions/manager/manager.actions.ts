export const managerTypes = {
  INIT: 'INIT',
}

export const managerInit = () => {
  // Make axios call with credential/jwt
  return {
    payload: {
      checkIns: [],
      classes:  []
    },
    type: managerTypes.INIT
  }
}