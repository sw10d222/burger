import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import { Route } from "react-router-dom";
import ContactData from "../../components/ContactData";

class ShippingPage extends Component {
  cancelOrder = () => {
    this.props.history.goBack();
  };
  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };

  render() {
    return (
      <div className={css.Shippingpage}>
        <p>
          <strong> Таны захиалга амттай байх болно гэж найдаж байна</strong>
        </p>
        <p>
          <strong>Нийт дүн: {this.props.price} ₮</strong>
        </p>
        <Burger />
        <Button
          clicked={this.cancelOrder}
          btnType="Danger"
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
        />
        <Button
          clicked={this.showContactData}
          btnType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        />
        {/* //nest Route */}
        <Route path="/ship/contact">
          <ContactData />
        </Route>
        {/* 
        ShippingPage ээс ContactData руу state мэдээлэл дамжуулах 2 арга турршиж үзлээ */}
        {/* <Route
          path="/ship/contact"
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        /> */}
      </div>
    );
  }
}
// a
const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
  };
};
export default connect(mapStateToProps)(ShippingPage);
