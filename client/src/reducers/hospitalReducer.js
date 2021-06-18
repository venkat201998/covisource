export const hospitalReducer = (state = null, action) => {
    switch (action.type) {
      case "HOSPITAL":
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  };