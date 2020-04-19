import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUsersPage, requestCompeleted } from "../../actions/getUsersPage";
import { UsersTable } from "../../components/UsersTable";
import { Button, Form } from 'react-bootstrap';
import { deleteUser } from "../../actions/deleteUser";
import { getManyUsers } from "../../actions/getUsers";
//import { getCurrentUser } from "../../actions/getCurrentUser"
import "./index.css";
import { Redirect } from "react-router-dom";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }; 
    //this.ref = [];
  };

  componentDidMount = () => {
    this.props.dispatch(getUsersPage(1, this.props.users.sort, 
      this.props.users.isAsending, this.props.users.keyword))
    /*
    if (this.props.users.getAll) {
      this.props.dispatch(getUsersPage(1, this.props.users.sort, 
                                      this.props.users.isAsending, this.props.users.keyword))
    } else {
      this.props.dispatch(getCurrentUser(this.props.users.parentId))
      this.props.dispatch(getManyUsers(1, this.props.users.sort, 
                                      this.props.users.isAsending, this.props.users.keyword, this.props.users.parentId))
    }
    */
  };

  handleReset = () => {
      this.props.dispatch(requestCompeleted());
      this.props.dispatch(getUsersPage(1));
    };

  handleCreate = () => {
    this.props.dispatch(requestCompeleted());
    this.props.history.push("/create")
  };

  handleMany= ids => {
    console.log(ids);
    console.log("cant get?")
    this.props.dispatch(getManyUsers(ids, 1))
  };
  /*
  handleMany = (ids, parentId) => {
    this.props.dispatch(getManyUsers(ids, 1, null, null, null, parentId));
  };
  */
  loadData = () => {
    console.log("load data")
    this.props.dispatch(getUsersPage(this.props.users.pageNo+1, this.props.users.sort, 
      this.props.users.isAsending, this.props.users.keyword))
  };

  handleSort = sortVar => {
    const { dispatch, users } = this.props;
    if (users.isAsending === null) {
      if (users.getAll) {
        dispatch(getUsersPage(1, sortVar, 1, users.keyword))
      } else {
        let ids = [];
        users.data.forEach(user => ids.push(user._id));
        dispatch(getManyUsers(ids, 1, sortVar, 1, users.keyword))
      }
    } else {
        if (users.getAll) {
          dispatch(getUsersPage(1, sortVar, -users.isAsending, users.keyword))
        } else {
          let ids = [];
          users.data.forEach(user => ids.push(user._id));
          dispatch(getManyUsers(ids, 1, sortVar, -users.isAsending, users.keyword))
        }
      }
  };

  handleSearch = e => {
    const { dispatch, users } = this.props;
    e.preventDefault();
    if (users.getAll) {
      dispatch(getUsersPage(1, users.sort, users.isAsending, e.target.value))
    } 
  }

  handleSortButton = sortVar => {
    const { users } = this.props;
    if (users.sort !== sortVar) {
      return "fa fa-sort"
    } 
    if (users.sort === sortVar) {
      if (users.isAsending === null) {
        return "fa fa-sort"
      } else if (users.isAsending === "-1") {
        return "fa fa-sort-down"
      }
      else if (users.isAsending === "1") {
        return "fa fa-sort-up"
      }
    }
  };

  handleEdit = id => {
    const { dispatch } = this.props;
    dispatch(requestCompeleted());
    this.props.history.push(`/edit/${id}`);
  };

  handleDelete = (id) => {
    const { users } = this.props;
    this.props.dispatch(deleteUser(id, users.pageNo, users.sort, users.isAsending, users.keyword))
  };

  render() {
    //console.log(this.props.users);
    if (this.props.users.error !== "" || this.props.userDelete.error !== "" ) {
      return <Redirect to={ { pathname: "/errorPage" } } />
    }; 
    return (
      <div>
        <h1 style={{"textAlign": "center"}}>Soldier's List</h1>
        <hr />
        <span>
          <Form.Row>
          <Form.Control style={{width: "150px"}} className="input" onChange={this.handleSearch}></Form.Control>
          <Button className="btn"
            onClick={this.handleReset}
          >Reset</Button>
          <Button 
            onClick={this.handleCreate}
          >Create</Button>
          </Form.Row>
        </span>
        <br />
        <UsersTable 
          className="userlist"
          users={this.props.users}
          loadData={this.loadData}
          handleDelete={this.handleDelete}
          handleMany={this.handleMany}
          handleSort={this.handleSort}
          handleSortButton={this.handleSortButton}
          handleEdit={this.handleEdit}
          //handleOne={this.handleOne}
        />
      </div>
    )
  }

};

const mapStateToProps = state => {
  return {
    users: state.users,
    userDelete: state.userDelete
  }
};

export default withRouter(connect(mapStateToProps)(Home));