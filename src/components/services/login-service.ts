import axios from '../common/axios-config';

class LoginService {
  constructor() {}

  login(
    email: string,
    password: string,
    successCallback: any,
    errorCallback: any
  ) {
    axios
      .post('/login', {
        email: email,
        password: password,
      })
      .then(function (response) {
        successCallback(response);
      })
      .catch(function (error) {
        errorCallback(error);
      });
  }
}

const loginService = new LoginService();

export default loginService;
