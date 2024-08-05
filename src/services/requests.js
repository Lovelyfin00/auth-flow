import apiEndpoints from "./api";

async function makeRequest(
    endpoint,
    method,
    data = null,
    headers = {},
    contentType = "application/json",
  ) {
    const requestOptions = {
      method,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
    };
  
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
  
    const response = await fetch(endpoint, requestOptions);
  
    if (!response.ok) {
      const errorMessage = await response.json();

      throw new Error(JSON.stringify(errorMessage.errorMessage));
    }
  
    return response.json();
  }
  
  const AuthRequests = {
    register: (data) => {
      const endpoint = apiEndpoints.register;
      return makeRequest(endpoint, "POST", data, {});
    },
    signIn: (data) => {
        const endpoint = apiEndpoints.signIn;
        return makeRequest(endpoint, "POST", data, {});
      },
    userProfile: () => {
        const endpoint = apiEndpoints.userProfile;
        const token = window.localStorage.getItem("token");
        
        return makeRequest(endpoint, "GET", null, {
            Authorization: `Bearer ${token}`,
          });
      },
    myWallet: () => {
        const endpoint = apiEndpoints.myWallet;
        const token = window.localStorage.getItem("token");
        
        return makeRequest(endpoint, "GET", null, {
            Authorization: `Bearer ${token}`,
          });
      },
  }

  export default AuthRequests;