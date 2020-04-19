const users = (state = { 
  isLoading: false, error: '', data: [], pageNo: 1, hasMore: false, sort: null, isAsending: null, keyword: null,
  totalCount: null, totalPages: null, getAll: true, 
  //parentId: null 
}, action) => {
  switch(action.type) {
    case 'REQUEST_PAGINATION_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'REQUEST_PAGINATION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.users,
        pageNo: action.pageNo,
        hasMore: action.hasMore,
        totalCount: action.totalCount,
        totalPages: action.totalPages,
        sort: action.sort,
        isAsending: action.isAsending,
        keyword: action.keyword,
        getAll: action.getAll,
        //parentId: action.parentId
      }
    case 'REQUEST_PAGINATION_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case 'REQUEST_PAGINATION_COMPELETED':
      return {
        ...state,
        data: [], 
      }
    default:
      return state;
  }
};
//keyword and sort 
export default users;