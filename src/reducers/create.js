const userCreate = (state = { isLoading: false, error: '', data: [] }, action) => {
    switch(action.type) {
      case "CREATE_USER_START":
        return {
          ...state,
          isLoading: true
        };
      case "CREATE_USER_SUCCESS":
        return {
          isLoading: false,
          data: action.info,
          error: '',
        }
      case "CREATE_USER_COMPELETED":
        return {
          ...state,
          data: [],
        }
      case "CREATE_USER_FAIL":
        return { 
          ...state,
          error: action.error,
        }
      default:
        return state;
    }
  }; 
  
  export default userCreate;