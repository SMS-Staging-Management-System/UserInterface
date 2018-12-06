const dev = {
  smsContext: process.env.REACT_APP_DEVELOPMENT_SERVER_ADDRESS_TEST,
  cognitoClientId:    process.env.REACT_APP_COGNITO_CLIENT_ID,
  cognitoUserPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID
};

const prod = {
  smsContext: process.env.REACT_APP_PRODUCTION_SERVER_ADDRESS,
  cognitoClientId:    process.env.REACT_APP_COGNITO_CLIENT_ID,
  cognitoUserPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID
};

export const environment = process.env.REACT_APP_DEVELOPMENT_SERVER_ADDRESS === "production" ? prod : dev;