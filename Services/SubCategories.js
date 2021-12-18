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

export const ParseGetAll = async () => {
  const data = await getAll();
  if (data === null) return [];
  let categories = [];
  for (let i = 0; i < data.length; i += 5) {
    const tmp = data.slice(i, i + 5);
    categories.push(tmp);
  }
  return categories;
};

export const getOne = async (id) => {
  try {
    const res = await axios.get("http://localhost:1337/subcategories/" + id);
    console.log(res.data);
    return await res.data[0];
  } catch (err) {
    console.log(err);
  }
};
