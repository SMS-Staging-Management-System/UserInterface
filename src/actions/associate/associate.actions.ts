export const associateTypes = {
  INIT: 'INIT',
}

export const associateInit = () => {
  // Make axios call with credential/jwt
  return {
    payload: {
      checkIns: []
    },
    type: associateTypes.INIT
  }
}