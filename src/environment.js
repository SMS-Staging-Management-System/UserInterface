const dev = {
  awsRegion:          'us-west-2',
  cognitoClientId:    '49f1foekljhlqn185fme63hi0s',
  cognitoUserPoolId:  'us-west-2_8b6WpHm1z',
  smsContext:         'http://znc.anorexicseal.com:8765'
};

const prod = {
  awsRegion:          'us-west-2',
  cognitoClientId:    'n09bpbndlp78jrbv6rbar4d13',
  cognitoUserPoolId:  'us-east-1_xavxFp1nr',
  smsContext:         'http://znc.anorexicseal.com:8765'
};

export const environment = process.env.NODE_ENV === "production" ? prod : dev;
