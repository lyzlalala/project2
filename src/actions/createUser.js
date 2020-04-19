import axios from "axios";
import { requestCompeleted } from "./getUsersPage"
const API_URL = "http://localhost:8080/api/user/";


const createStart = () => {
  return {
    type: "CREATE_USER_START"
  }
};

const createSuccess = (info) => {
  return {
    type: "CREATE_USER_SUCCESS",
    info,
  }
};
const createCompeleted = () => {
  return {
    type: "CREATE_USER_COMPELETED",
  }
}
const createFail = error => {
  return {
    type: "CREATE_USER_FAIL",
    error
  }
};


export const createUser = (data, props) => {
  return (dispatch, getState) => {
    dispatch(createStart());
    axios
      .post(API_URL, data)
      .then(res => {
        dispatch(requestCompeleted());
        dispatch(createSuccess(res.data));
        console.log(res.data);
        console.log("prepare for push") 
        dispatch(createCompeleted());
      })
      .then(() => {
        props.history.push("/")
        console.log("push to root")
        }
      )
      .catch(err => {
        dispatch(createFail(err));
      });
  };
}
