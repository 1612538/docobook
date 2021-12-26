import axios from "axios";
const url = "http://localhost:1337/";

export const getAll = async () => {
  try {
    const res = await axios.get(url + "users?_sort=created_at:DESC");
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (id) => {
  try {
    const res = await axios.get(url + "users?id=" + id);
    if (res.data.length > 0) return await res.data[0];
    return null;
  } catch (err) {
    console.log(err);
  }
};
