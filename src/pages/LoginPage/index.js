import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/loginActions";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  login = () => {
    this.props.login(this.state.email, this.state.password);
  };
  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/orders" />}
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Емайл хаяг"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үг"
        />
        {this.props.logginIn && <Spinner />}

        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        <Button text="Login" btnType="Success" clicked={this.login} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logginIn: state.signupReducer.logginIn,
    firebaseError: state.signupReducer.firebaseError,
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(action.loginUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
