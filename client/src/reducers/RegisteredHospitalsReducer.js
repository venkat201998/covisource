export const registeredHospitalReducer = (state = null, action) => {
    switch (action.type) {
      case "HOSPITAL_STATUS_INACTIVE":
        return action.payload;
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
};