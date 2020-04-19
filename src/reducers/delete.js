const userDelete = (state = { isLoading: false, error: '', data: [] }, action) => {
    switch(action.type) {
      case "DELETE_USER_START":
        return {
          ...state,
          isLoading: true
        };
      case "DELETE_USER_SUCCESS":
        return {
          isLoading: false,
          data: action.info,
          error: ''
        }
      case "DELETE_USER_FAIL":
        return {
          isLoading: false, 
          error: action.error,
          data: [],
        }
      case "DELETE_USER_COMPELETED":
        return {
          isLoading: false,
          error: "",
          data: []
        }
      default:
        return state;
    }
  }; 
  
  export default userDelete;