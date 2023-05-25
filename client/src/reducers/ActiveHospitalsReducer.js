export const hospitalsReducer = (state = null, action) => {
    switch (action.type) {
      case "ACTIVE_HOSPITALS":
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
};