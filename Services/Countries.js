import axios from "axios";
const url = "http://localhost:1337/";

export const getAll = async () => {
  try {
    const res = await axios.get(url + "countries?_sort=name");
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const ParseGetAll = async () => {
  const data = await getAll();
  if (data === null) return [];
  let countries = [];
  for (let i = 0; i < data.length; i += 5) {
    const tmp = data.slice(i, i + 5);
    countries.push(tmp);
  }
  return countries;
};

export const getOne = async (id) => {
  try {
    const res = await axios.get(url + "countries/" + id);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};
