import axios from "axios";
//keyword and sort 
const requestStart = () => {
  return {
    type: 'REQUEST_PAGINATION_START'
  }
};

const requestSuccess = (users, pageNo, totalPages, totalCount, sort, 
  isAsending, keyword, hasMore, getAll, 
  //parentId
  ) => {
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
    getAll,
    //parentId
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

export const getManyUsers = (ids, pageNo, sort = null, isAsending = null, keyword = null
  //, parentId = null
  ) => {
  return (dispatch, getState) => {
    dispatch(requestStart());
    let API 
    console.log(ids)
    if (keyword !== null && sort !== null) {
      API = `http://localhost:8080/api/users/[${ids}]/${pageNo}/?sort[${sort}]=${isAsending}${"&"}keyword=${keyword}`
    }
    else if (sort !== null) {
      API = `http://localhost:8080/api/users/[${ids}]/${pageNo}/?sort[${sort}]=${isAsending}`
    } 
    else if (keyword !== null) {
      API = `http://localhost:8080/api//users/[${ids}]/${pageNo}/?keyword=${keyword}`
    }
    else if (keyword === null && sort === null) {
      API = `http://localhost:8080/api/users/[${ids}]/${pageNo}`
    };
    console.log(API);
    axios
      .get(API)
      .then(res => {
        console.log(res);
        dispatch(requestSuccess(res.data.data, res.data.pageNo, 
                                res.data.totalPages, res.data.totalCount, res.data.sort, res.data.isAsending,
                                res.data.keyword, res.data.hasMore, false, 
                                //parentId
                                ));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
