//анх state хоосон байх үед зарлаж байна
const initialState = {
  //load orders state
  orders: [],
  loading: false,
  error: null,
  //save order state
  newOrder: {
    saving: false,
    finished: false,
    error: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // FireBase аас унших хэсгийг action аар state дээр орох өөрчлөлтүүд
    case "LOAD_ORDERS_START":
      return {
        //state задлаад loading ын утгыг өөрчлөж байна
        ...state,
        loading: true,
      };
    case "LOAD_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case "LOAD_ORDERS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    // эндээс order save хийх action дээр хийгдэх state ийн өөрчлөлтүүд бичигдэж байна
    case "SAVE_ORDER_START":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: true,
        },
      };
    case "SAVE_ORDER_SUCCESS":
      return {
        ...state,
        // шинээр state үүсгэж дарж явах ёстой
        newOrder: {
          ...state.newOrder,
          saving: false,
          finished: true,
          error: null,
        },
      };
    case "SAVE_ORDER_ERROR":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          finished: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default reducer;
