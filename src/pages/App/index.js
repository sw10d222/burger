import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Orderpage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../../pages/ShippingPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions";
import * as signupactions from "../../redux/actions/signupActions";

class App extends Component {
  state = {
    showSidebar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirDate = new Date(localStorage.getItem("expirDate"));
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      if (expirDate > new Date()) {
        //хугацаа нь дуусаагүй токен байна логин хийнэ
        this.props.autoLogin(token, userId);
        //token хүчингүй болход үлдэж байгаа хугацааг бодож автомараар лог аут хийнэ
        this.props.autologoutAfterMillisec(
          expirDate.getTime() - new Date().getTime()
        );
      } else {
        //Token хугацаа дууссан байна
        this.props.logout();
      }
    }
  };
  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />
        <main className={css.Content}>
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={Orderpage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Redirect to="login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupactions.logout()),
    autologoutAfterMillisec: () =>
      dispatch(signupactions.autologoutAfterMillisec()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
