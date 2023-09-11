const devObj = {
    redirectUri: "http://localhost:3000/oauth2/redirect",
    apiBaseUrl: "http://ec2-52-9-207-36.us-west-1.compute.amazonaws.com:8080",
    pythonapiBaseUrl : process.env.REACT_APP_PYTHON_SERVER_BASE_URL
    // pythonapiBaseUrl : "http://ec2-184-169-244-226.us-west-1.compute.amazonaws.com:8000"
  };
export default devObj;