import axios from "axios";
//keyword and sort 
const requestStart = () => {
  return {
    type: 'REQUEST_PAGINATION_START'
  }
};

const requestSuccess = (users, pageNo, totalPages, totalCount, sort, 
  isAsending, keyword, hasMore, getAll) => {
  return {
    type: 'REQUEST_PAGINATION_SUCCESS',
    users,
    pageNo,
    totalPages, 
    totalCount,
    sort,
    isAsending,
    keyword,
    hasMore,
    getAll
  }
};

const requestFail = error => {
  return {
    type: 'REQUEST_PAGINATION_FAIL',
    error
  }
};

export const requestCompeleted = () => {
  return {
    type: 'REQUEST_PAGINATION_COMPELETED'
  }
};

export const getUsersPage = (pageNo, sort = null, isAsending = null, keyword = null) => {
  return (dispatch, getState) => {
    dispatch(requestStart());
    let API 
    if (keyword !== null && sort !== null) {
      API = `http://localhost:8080/api/get/users/${pageNo}/?sort[${sort}]=${isAsending}${"&"}keyword=${keyword}`
    }
    else if (sort !== null) {
      API = `http://localhost:8080/api/get/users/${pageNo}/?sort[${sort}]=${isAsending}`
    } 
    else if (keyword !== null) {
      API = `http://localhost:8080/api/get/users/${pageNo}/?keyword=${keyword}`
    }
    else if (keyword === null && sort === null) {
      API = `http://localhost:8080/api/get/users/${pageNo}`
    }
    console.log(API)
    axios
      .get(API)
      .then(res => {
        console.log(res);
        dispatch(requestSuccess(res.data.data, res.data.pageNo, 
                                res.data.totalPages, res.data.totalCount, res.data.sort, res.data.isAsending,
                                res.data.keyword, res.data.hasMore, true));
        //flag for focus 
        //ref[getCurrentid].focus()
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
