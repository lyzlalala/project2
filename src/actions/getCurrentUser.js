import axios from 'axios';
const API_URL = "http://localhost:8080/api/user/";

function requestStart() {
  return {
    type: 'REQUEST_CURRENTUSER_START'
  };
}
function requestSuccess(currentUser, Superior) {
  return {
    type: 'REQUEST_CURRENTUSER_SUCCESS',
    currentUser,
    Superior
  };
}
function requestFail(error) {
  return {
    type: 'REQUEST_CURRENTUSER_FAIL',
    error
  };
}

export const requestCurrentCompeleted = () => {
  return {
    type: "REQUEST_CURRENTUSER_COMPELETED"
  }
};

export const getCurrentUser = (id, props) => {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .get(API_URL + id)
      .then(response => {
        console.log(response);
        console.log(response.data.data.Superior === undefined);
        dispatch(requestSuccess(response.data.data, response.data.Superior));
        props.setState({ ...props.state, Name: response.data.data.Name, Sex: response.data.data.Sex, Email: response.data.data.Email, Phone: response.data.data.Phone, StartDate: response.data.data.StartDate, 
          Rank: response.data.data.Rank, Superior: !response.data.data.Superior ? "None" : response.data.data.Superior, Avatar: response.data.data.Avatar, });
        console.log(props)
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
