import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-4b304-default-rtdb.firebaseio.com/",
});

export default instance;
