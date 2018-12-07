const dev = {
  cognitoClientId:    process.env.REACT_APP_COGNITO_CLIENT_ID,
  cognitoUserPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID,
  smsContext: process.env.REACT_APP_DEVELOPMENT_SERVER_ADDRESS_TEST
};

const prod = {
  cognitoClientId:    process.env.REACT_APP_COGNITO_CLIENT_ID,
  cognitoUserPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID,
  smsContext: process.env.REACT_APP_PRODUCTION_SERVER_ADDRESS
};

const environment = {
  cognitoClientId:    process.env.REACT_APP_COGNITO_CLIENT_ID,
  cognitoUserPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID,
  smsContext: process.env.REACT_APP_PRODUCTION_SERVER_ADDRESS
};
export default environment;