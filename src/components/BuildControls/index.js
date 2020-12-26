import React from "react";
import css from "./style.module.css";
import BuildControl from "../BuildControl";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/burgerActions";
const BuildControls = (props) => {
  const disabledIngredients = { ...props.burgeriinOrts };
  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }

  return (
    <div className={css.BuildControls}>
      <p>
        Бургерийн үнэ:<strong>{props.price}</strong>
      </p>
      {
        //Array(4) 0: "bacon" 1: "cheese" 2: "meat" 3: "salad" length: 4 */
        Object.keys(props.ingredientNames).map((el) => (
          <BuildControl
            // key заавал бичиж өгнө гэдгийг мартаад байгаам даа
            key={el}
            ortsNemeh={props.ortsNemeh}
            ortsHasah={props.ortsHasah}
            disabled={disabledIngredients}
            type={el}
            orts={props.ingredientNames[el]}
          />
        ))
      }
      <button //synthetic
        onClick={props.showConfirmModal}
        disabled={!props.purchasing}
        className={css.OrderButton}
      >
        Захиалах
      </button>
    </div>
  );
};

// a
const mapStateToProps = (state) => {
  return {
    burgeriinOrts: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    purchasing: state.burgerReducer.purchasing,
    ingredientNames: state.burgerReducer.ingredientNames,
  };
};
//b function
const mapDispatchToProps = (dispatch) => {
  return {
    ortsNemeh: (ortsNer) => dispatch(actions.addIngredient(ortsNer)),
    ortsHasah: (ortsNer) => dispatch(actions.removeIngredient(ortsNer)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
