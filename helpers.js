import axios from "axios";
const environment = {
  prod: "https://iqvalue-investments-6efaf38cc2b7.herokuapp.com/",
  dev: "http://localhost:8080",
};
axios.defaults.baseURL = environment.prod;
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

let headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

const helpers = {};

helpers.login = async (data) => {
  try {
    const res = await axios.post("/auth/login", data, headers).then((v) => {
      console.log(v);
      return v;
    });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.logout = () => {
  localStorage.clear();
};

helpers.getUserDetailsFromLocalStorage = () => {
  const data = localStorage.getItem("user");
  return JSON.parse(data);
};

helpers.register = async (data) => {
  try {
    const res = await axios
      .post("/auth/register", data)
      .then((v) => {
        return v;
      })
      .catch((error) => {
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.getTransactions = async () => {
  const { _id } = await helpers.getUserDetailsFromLocalStorage();
  try {
    const res = await axios
      .get(`/transactions/${_id}`)
      .then((v) => {
        return v;
      })
      .catch((error) => {
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.addTransaction = async (data) => {
  const { _id } = await helpers.getUserDetailsFromLocalStorage();
  console.log("data...", data);

  try {
    const res = await axios
      .post(`/transactions/${_id}/withdraw`, data)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data from transactions endpoint....", data);
        return data;
      })
      .catch((error) => {
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.deposit = async (data) => {
  const { _id } = await helpers.getUserDetailsFromLocalStorage();
  console.log("data...", data);

  try {
    const res = await axios
      .post(`/transactions/${_id}/deposit`, data)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data from transactions endpoint....", data);
        return data;
      })
      .catch((error) => {
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.forgotPassword = async (email) => {
  console.log("email from helpers.js", email);
  try {
    const res = await axios
      .post(`users/forgot-password`, { email: email })
      .then((v) => {
        return v;
      })
      .catch((error) => {
        // console.log("error gan gan", error);
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.resetPassword = async (data) => {
  try {
    const res = await axios
      .post(`users/reset-password`, data)
      .then((v) => {
        return v;
      })
      .catch((error) => {
        // console.log("error gan gan", error);
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

helpers.verifyUser = async (data) => {
  const { _id } = await helpers.getUserDetailsFromLocalStorage();

  try {
    const res = await axios
      .post(`/users/${_id}/verify`, data)
      .then((resp) => resp.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });

    return res;
  } catch (error) {
    return error;
  }
};

export default helpers;
