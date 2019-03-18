const dev = {
  awsRegion:          'us-east-1',
  cognitoClientId:    '4mafdnad6u1o1ugokulsmbrl96',
  cognitoUserPoolId:  'us-east-1_6hCFlGZHZ',
  mgtContext:         'http://10.226.50.166:8090',
  surveyContext:       'http://10.226.50.166:8092',
  smsContext:         'http://10.226.50.166:8091'
};

const uat = {
  awsRegion:          'us-east-1',
  cognitoClientId:    '4mafdnad6u1o1ugokulsmbrl96',
  cognitoUserPoolId:  'us-east-1_6hCFlGZHZ',
  mgtContext:         'http://localhost:8090',
  smsContext:         'https://7i6rudc3m2.execute-api.us-east-1.amazonaws.com/uat',
  surveyContext:      'NEEDTOADD' // NEED TO ADD EC2 ADDRESS
};

const prod = {
  awsRegion:          'us-east-1',
  cognitoClientId:    'n09bpbndlp78jrbv6rbar4d13',
  cognitoUserPoolId:  'us-east-1_xavxFp1nr',
  mgtContext:         'http://localhost:8090',
  smsContext:         'https://7i6rudc3m2.execute-api.us-east-1.amazonaws.com/prod',
  surveyContext:      'NEEDTOADD' // NEED TO ADD EC2 ADDRESS
};

console.log(process.env.NODE_ENV);

export let environment = dev;

if (process.env.REACT_APP_ENV === 'uat') {
  environment = uat;
} else if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
  environment = prod;
}
