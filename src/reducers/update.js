const userUpdate = (state = { isLoading: false, error: '', data: []}, action) => {
    switch(action.type) {
      case "UPDATE_USER_START":
        return {
          ...state,
          isLoading: true
        };
      case "UPDATE_USER_SUCCESS":
        return {
          isLoading: false,
          data: action.info,
          error: ''
        }
      case "UPDATE_USER_COMPELETED":
        return {
          ...state,
          data: []
        }
      case "UPDATE_USER_FAIL":
        return {
          ...state,
          error: action.error,
        }
      default:
        return state;
    }
  }; 
  
  export default userUpdate;