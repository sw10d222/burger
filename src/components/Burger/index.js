import React from "react";
import BurgerIngredient from "../Burgeringredient/";
import css from "./style.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Burger = (props) => {
  //{"salad":1,"cheese":2,"bacon":2,"meat":1}
  //Обект ийн эхний атербутыг массив болгож буцаадаг функц
  const items = Object.entries(props.orts);
  let content = [];
  items.map((el) => {
    for (let i = 0; i < el[1]; i++)
      content.push(<BurgerIngredient key={`${el[0]}${i + 1}`} type={el[0]} />);
    return null;
  });
  if (content.length === 0)
    content = <p>Хачиртай талхныхаа орцыг сонгоно уу...</p>;

  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-botton" />
    </div>
  );
};

// a
const mapStateToProps = (state) => {
  return {
    orts: state.burgerReducer.ingredients,
  };
};

export default connect(mapStateToProps)(withRouter(Burger));
