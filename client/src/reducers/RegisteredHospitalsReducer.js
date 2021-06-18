export const registeredHospitalReducer = (state = null, action) => {
    switch (action.type) {
      case "INACTIVE_HOSPITALS":
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
};