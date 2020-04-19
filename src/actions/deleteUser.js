import axios from "axios";
import { getUsersPage } from "./getUsersPage"
const API_URL = "http://localhost:8080/api/user/delete/";

 
const deleteStart = () => {
  return {
    type: "DELETE_USER_START"
  }
};

const deleteSuccess = info => {
  return {
    type: "DELETE_USER_SUCCESS",
    info
  }
};

export const deleteCompeleted = () => {
  return {
    type: "DELETE_USER_COMPELETED",
  }
};

const deleteFail = error => {
  return {
    type: "DELETE_USER_FAIL",
    error
  }
};


export const deleteUser = (id, pageNo, sort, isAsending, keyword) => {
  return (dispatch, getState) => {
    dispatch(deleteStart());
    console.log(sort, isAsending, keyword);
    axios
      .delete(API_URL + id)
      .then(res => {
        dispatch(deleteSuccess(res.data));
        console.log(res.data);
        dispatch(getUsersPage(pageNo, sort, isAsending, keyword));
        dispatch(deleteCompeleted());
      })
      .catch(err => {
        dispatch(deleteFail(err));
      });
  };
}

