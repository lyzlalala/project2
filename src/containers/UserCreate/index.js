import React, { Component }  from "react"; 
import  CreateForm from "../../components/CreateInput";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../../actions/createUser";
import { code } from "./defaultImage";
import { getUsersPage, requestCompeleted } from "../../actions/getUsersPage";
import { Redirect } from "react-router-dom";

//To do:
//after submit: push to root (push in actions setup state of the page)
//before loading: get all user's Name as candidates of superior(in CreateInput map name of all users as options)
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { Name: "", Sex: "Choose Your Gender", Rank: "Choose A Rank", StartDate: "", Phone: "", Email: "", Avatar: code, Superior: "None",
    NameError: "", PhoneError: "", EmailError: "",
    };
  };

  componentDidMount() {
    this.props.dispatch(getUsersPage(this.props.users.totalPages))
  };

  handleName = e => {
    e.preventDefault();
    this.setState({ ...this.state, Name: e.target.value }, () => {
      this.validateName();
    });
  };

  validateName = () => {
    const re_name = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
    const { Name} = this.state;
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
  
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const body = {
      Name: this.state.Name,
      Sex: this.state.Sex,
      Rank: this.state.Rank, 
      StartDate: this.state.StartDate,
      Phone: this.state.Phone,
      Email: this.state.Email,
      Avatar: this.state.Avatar, 
      Superior: this.state.Superior
    };
    dispatch(createUser(body, this.props));
  };

  checkButton = () => {
    if (this.state.NameError === null && this.state.PhoneError === null && this.state.EmailError === null && this.state.Sex !== "Choose Your Gender"
        &&  this.state.Rank !== "Choose A Rank" && this.state.StartDate !== "") {
          return false
    } else {
      return true 
    }
  };

  handleGoBack = e => {
    e.preventDefault();
    this.props.dispatch(requestCompeleted());
    this.props.history.push("/");
    console.log("go back");
  };

  render() {
    if (this.props.userCreate.error !== "" || this.props.users.error !== "") {
      return <Redirect to={ { pathname: "/errorPage" } } />
    }; 
    return (
      <div>
        <CreateForm 
          handleName={this.handleName}
          validateName={this.validateName}
          NameError={this.state.NameError}
          handleSex={this.handleSex}
          Sex={this.state.Sex}
          handleRank={this.handleRank}
          Rank={this.state.Rank}
          handleDate={this.handleDate}
          StartDate={this.state.StartDate}
          handleEmail={this.handleEmail}
          validateEmail={this.validationEmail}
          EmailError={this.state.EmailError}
          handlePhone={this.handlePhone}
          validationPhone={this.validationPhone}
          PhoneError={this.state.PhoneError}
          handleSubmit={this.handleSubmit}
          handleGoBack={this.handleGoBack}
          Avatar={this.state.Avatar}
          handleAvatar={this.handleAvatar}
          checkButton={this.checkButton}
          users={this.props.users}
          handleSuperior={this.handleSuperior}
        />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    userCreate: state.userCreate,
    users: state.users
  }
};

export default withRouter(connect(mapStateToProps)(Create)); 