import { LoginAction } from "./actiontype.js";

// type GoogleUser = { // this is a type for different objects. Will use this when we convert the project to typescript
//     name: string;
//     profilePic: string;
//     email: string;
//     googleId: string;
// }

const UserLogin = (user) => {
  return {
    type: LoginAction,
    payload: user,
  };
};

export default UserLogin;
