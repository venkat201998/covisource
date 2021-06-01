export const inActiveHospitalReducer = (state = null, action) => {
    switch (action.type) {
      case "INACTIVE_HOSPITALS_LOGIN":
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
};