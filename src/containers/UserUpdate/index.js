import React, { Component } from "react";
import { getCurrentUser } from "../../actions/getCurrentUser.js";
import { updateUser } from "../../actions/updateUser.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UpdateForm } from "../../components/UpdateInput";
import { requestCurrentCompeleted } from "../../actions/getCurrentUser" ;
import { Redirect } from "react-router-dom";

class Update extends Component {
  constructor(props) {
    super(props);
    //const { currentUser } = this.props;
    this.state = { Name: null, Sex: null, Email: null, Phone: null, StartDate: null, Rank: null, 
    Superior: null, Avatar: null, NameError: "", PhoneError: "", EmailError: "" 
    
    };
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(getCurrentUser(id, this));
  }

  handleName = e => {
    e.preventDefault();
    this.setState({ ...this.state, Name: e.target.value }, () => {
      this.validateName();
    });
  };

  validateName = () => {
    const re_name = /^[A-Z]{1}[a-z.'-]{1,50}$/i;
    const { Name } = this.state;
    this.setState({
      NameError:
        re_name.test(Name) ? null : "Not a Valid Name"
    });
  };

  handleSex = e => {
    e.preventDefault();
    this.setState({ ...this.state, Sex: e.target.value });
  };

  handleRank = e => {
    e.preventDefault();
    this.setState({ ...this.state, Rank: e.target.value });
  };

  handleSuperior = e => {
    e.preventDefault();
    this.setState({ ...this.state, Superior: e.target.value });
  };

  handleDate = e => {
    e.preventDefault();
    this.setState({ ...this.state, StartDate: e.target.value });
  };

  handleEmail = e => {
    e.preventDefault();
    this.setState({ ...this.state, Email: e.target.value }, () => {
      this.validationEmail();
    });
  };

  validationEmail = () => {
    const re_email = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    this.setState({
      ...this.state,
      EmailError: re_email.test(this.state.Email) ? null : "Not a Valid Email Address"
    });
  };

  handlePhone = e => {
    e.preventDefault();
    this.setState({ ...this.state, Phone: e.target.value }, () => {
      this.validationPhone();
    })
  };

  validationPhone = () => {
    const re_phone = /^[0-9]{10}$/;
    this.setState({
      ...this.state,
      PhoneError: re_phone.test(this.state.Phone) ? null : "Not a Valid Phone Number"
    });
  };

  handleAvatar = (e) =>  {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        //file: file,
        ...this.state,
        Avatar: reader.result
      });
    };
  };

  handleSelected = id => {
    if (this.state.Superior && this.state.Superior._id === id) {
      return true
    } else {
      return false
    }
  };

  handleCheckButton = () => {
    if ((this.state.NameError === null || this.state.NameError === "") && (this.state.PhoneError === null || this.state.PhoneError === "") && (this.state.EmailError === null || this.state.EmailError === "") && this.state.Sex !== "Choose Your Gender"
        &&  this.state.Rank !== "Choose A Rank") {
          return false
    } else {
      return true 
    }
  };

  handleGoBack = () => {
    this.props.history.push("/");
    this.props.dispatch(requestCurrentCompeleted());
  };
  
  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { Name, Sex, Phone, Email, Superior, Avatar, StartDate, Rank } = this.state;
    const { dispatch, currentUser } = this.props;
    console.log(Superior);
    const body = { Name: Name === currentUser.data.Name ? undefined : Name,
                   Sex: Sex === currentUser.data.Sex ? undefined : Sex, 
                   Email: Email === currentUser.data.Email ? undefined : Email, 
                   Superior: (Superior === "None" && !currentUser.data.Superior )  
                            || (Superior._id && currentUser.data.Superior && currentUser.data.Superior._id && Superior._id === currentUser.data.Superior._id) 
                            || (currentUser.data.Superior && currentUser.data.Superior._id && Superior === currentUser.data.Superior._id)  ? undefined : Superior, 
                   Avatar: Avatar === currentUser.data.Avatar ? undefined : Avatar,
                   StartDate: StartDate === currentUser.data.StartDate ? undefined : StartDate, 
                   Rank: Rank === currentUser.data.Rank ? undefined : Rank,
                   Phone: Phone === currentUser.data.Phone ? undefined : Phone
    };
    console.log(body);
    dispatch(updateUser(id, body, this.props));
  }
  
  render() {
    if (this.props.userUpdate.error !== "" || this.props.currentUser.error !== "" || this.props.users.error !== "") {
      return <Redirect to={ { pathname: "/errorPage" } } />
    };
    const { currentUser } = this.props;
    //console.log(this.props.currentUser);
    console.log(this.state);
    const InputUI = (
    <UpdateForm
      Avatar={currentUser.data.Avatar}
      handleAvatar={this.handleAvatar}
      handleName={this.handleName}
      validateName={this.validateName}
      NameError={this.state.NameError}
      handleSex={this.handleSex}
      Sex={this.state.Sex}
      handleRank={this.handleRank}
      handleSuperior={this.handleSuperior}
      users={currentUser.Superior}
      handleDate={this.handleDate}
      StartDate={this.state.StartDate}
      handleEmail={this.handleEmail}
      EmailError={this.state.EmailError}
      validationEmail={this.validationEmail}
      handlePhone={this.handlePhone}
      validationPhone={this.validationPhone}
      handleGoBack={this.handleGoBack}
      current={currentUser.data}
      state={this.state}
      handleSelected={this.handleSelected}
      handleCheckButton={this.handleCheckButton}
      handleSubmit={this.handleSubmit}
    />
    )
    return (
    <div>{InputUI}</div>
    );
  }
};


const mapStateToProps = state => {
  return {
    userUpdate: state.userUpdate,
    currentUser: state.currentUser,
    users: state.users
  }
};

export default withRouter(connect(mapStateToProps)(Update));