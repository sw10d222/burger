import axios from "../../axios-orders";

export const loadOrders = (userId) => {
  //тусгай төрлийн action бичнэ Function буцаана тэгвэл redux Thunk барьж авдаг
  return function (dispatch) {
    //orders load хийх эхлэлээ гэдгийг мэдэгдэнэ
    //Энийг хүлээж аваад Spinner ажиллаж эхэлнэ
    dispatch(loadOrdersStart());
    const token = localStorage.getItem("token");

    axios
      .get(`/orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const loadedOrders = Object.entries(response.data).reverse();
        //амжилттай татсан учир dispatch ашиглаж loadOrdersSuccess дуудаж loadedOrders Дамжуулана reducer нь state order өөрчлөнө
        dispatch(loadOrdersSuccess(loadedOrders));
      })
      //алдаа гарсан үед
      .catch((err) => dispatch(loadOrdersError(err)));
  };
};

//===============================================================================================================
export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};
export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};
export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

//===============================================================================================================
//захиалга хадгалах
export const saveOrder = (newOrder) => {
  return function (dispatch) {
    //Spinner ergelduulne
    dispatch(saveOrderStart());
    const token = localStorage.getItem("token");

    //Firebase ruu insert
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((response) => {
        dispatch(saveOrderSuccess());
      })
      .catch((error) => {
        dispatch(saveOrderError(error));
      });
  };
};
//===============================================================================================================
export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};
export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};

export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};
