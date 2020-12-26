const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 0,
  purchasing: false,
  ingredientNames: {
    bacon: "Гахайн Мах",
    cheese: "Бяслаг",
    meat: "Үхрийн мах",
    salad: "Салад",
  },
};

const INGREDIENTS_PRICES = {
  salad: 150,
  cheese: 250,
  bacon: 800,
  meat: 1500,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ortsNer],
        purchasing: true,
      };
    case "REMOVE_INGREDIENT":
      const newPrice = state.totalPrice - INGREDIENTS_PRICES[action.ortsNer];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
        },
        totalPrice: newPrice,
        purchasing: newPrice > 0,
      };
    default:
      return state;
  }
};

export default reducer;
