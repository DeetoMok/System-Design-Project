import { LoginAction, LogoutAction } from "./actiontype.js";

const defaultUserInfo = {
  name: "",
  profilePic: "",
  email: "",
  googleId: "",
  isSignedIn: false,
  csrf: "",
};

const googleLoginReducer = (userInfo = defaultUserInfo, action) => {
  switch (action.type) {
    case LoginAction:
      return {
        ...userInfo,
        name: action.payload.getName(),
        profilePic: action.payload.getImageUrl(),
        email: action.payload.getEmail(),
        csrf: action.csrf,
        isSignedIn: true,
      };
    case LogoutAction:
      return {
        name: "",
        profilePic: "",
        email: "",
        googleId: "",
        isSignedIn: action.isSignIn,
      };
    default:
      return userInfo;
  }
};
export default googleLoginReducer;
