const dev = {
  awsRegion:          'us-west-2',
  blakeContext:       'https://t4o3pxu8dj.execute-api.us-west-2.amazonaws.com/dev',
  cognitoClientId:    '49f1foekljhlqn185fme63hi0s',
  cognitoUserPoolId:  'us-west-2_8b6WpHm1z',
  smsContext:         'http://znc.anorexicseal.com:8765'
};

const prod = {
  awsRegion:          'us-east-1',
  blakeContext:       'https://t4o3pxu8dj.execute-api.us-west-2.amazonaws.com',
  cognitoClientId:    'n09bpbndlp78jrbv6rbar4d13',
  cognitoUserPoolId:  'us-east-1_xavxFp1nr',
  smsContext:         'https://7i6rudc3m2.execute-api.us-east-1.amazonaws.com/prod'
};

export const environment = process.env.NODE_ENV === "production" ? prod : dev;