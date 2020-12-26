//Бургер дээр хийгдэх action зарлаж өгч байна  ortsNer=ingredients

export const addIngredient = (ortsNer) => {
  return { type: "ADD_INGREDIENT", ortsNer };
};

export const removeIngredient = (ortsNer) => {
  return { type: "REMOVE_INGREDIENT", ortsNer };
};
