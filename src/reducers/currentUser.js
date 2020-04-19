const currentUser = (
  state = { isLoading: false, error: '', data: [], Superior: [] },
  action
) => {
  switch (action.type) {
    case 'REQUEST_CURRENTUSER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_CURRENTUSER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.currentUser,
        Superior: action.Superior
      };
    case 'REQUEST_CURRENTUSER_FAIL':
      return {
        ...state,
        data: [],
        isLoading: false,
        error: action.error
      };
    case "REQUEST_CURRENTUSER_COMPELETED":
      return {
        data: [],
        Superior:[],
        isLoading: false,
        error: ""
      };
    default:
      return state;
  }
};

export default currentUser;
