export const logoutReducer = (state = null, action) => {
    switch (action.type) {
      case "SIGNOUT":
        return action.payload;
    case "SIGNIN":
        return action.payload;
      default:
        return state;
    }
};