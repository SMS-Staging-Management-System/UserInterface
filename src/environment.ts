const dev = {
  awsRegion:          'us-west-2',
  cognitoClientId:    'n09bpbndlp78jrbv6rbar4d13',
  cognitoUserPoolId:  'us-east-1_xavxFp1nr',
  smsContext:         'http://localhost:8765'
};

const prod = {
  awsRegion:          'us-east-1',
  cognitoClientId:    'n09bpbndlp78jrbv6rbar4d13',
  cognitoUserPoolId:  'us-east-1_xavxFp1nr',
  smsContext:         'https://7i6rudc3m2.execute-api.us-east-1.amazonaws.com/prod'
};

console.log(process.env.NODE_ENV);

export let environment = dev;

if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
  environment = prod;
}
