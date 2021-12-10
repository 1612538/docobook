import axios from "axios";

export const getAll = async () => {
  try {
    const res = await axios.get(
      "http://localhost:1337/subcategories?_sort=name"
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (id) => {
  try {
    const res = await axios.get("http://localhost:1337/subcategories" + id);
    console.log(res.data);
    return await res.data[0];
  } catch (err) {
    console.log(err);
  }
};
