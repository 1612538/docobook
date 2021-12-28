import axios from "axios";

export const Register = async (user) => {
  try {
    const res = await axios.post(
      "http://localhost:1337/auth/local/register",
      user
    );
    return res.data;
  } catch (err) {
    console.log("An error occurred:", err);
    return null;
  }
};

export const LogIn = async (user) => {
  try {
    const res = await axios.post("http://localhost:1337/auth/local", {
      identifier: user.email,
      password: user.password,
    });
    return res.data;
  } catch (err) {
    console.log("An error occurred:", err);
    return null;
  }
};
