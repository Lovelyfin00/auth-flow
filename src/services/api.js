let routeUrl = "https://quizapi.laspg-online.com";

const apiEndpoints = {
    register:
      `${routeUrl}/api/Account/Register`,
    signIn:
      `${routeUrl}/api/Account/Authenticate`,
    userProfile:
      `${routeUrl}/api/User/Profile`,
    myWallet:
      `${routeUrl}/api/Wallet/MyWallet`,
}

export default apiEndpoints;