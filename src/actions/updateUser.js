import axios from "axios";
import { requestCurrentCompeleted } from "./getCurrentUser"
const API_URL = "http://localhost:8080/api/user/update/";

const updateStart = () => {
  return {
    type: "UPDATE_USER_START"
  }
};

const updateSuccess = info => {
  return {
    type: "UPDATE_USER_SUCCESS",
    info
  }
};

export const updateCompeleted = () => {
  return {
    type: "UPDATE_USER_COMPELETED"
  }
};

const updateFail = error => {
  return {
    type: "UPDATE_USER_FAIL",
    error
  }
};


export const updateUser = (id, data, props) => {
  return (dispatch, getState) => {
    dispatch(updateStart());
    console.log(data)
    axios
      .put(API_URL + id, data)
      .then(res => {
        dispatch(updateSuccess(res.data));
        dispatch(requestCurrentCompeleted());
        dispatch(updateCompeleted());
        props.history.push("/");
        console.log(res.data)
      })
      .catch(err => {
        dispatch(updateFail(err));
        console.log(err);
      });
  };
}
