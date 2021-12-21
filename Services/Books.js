import axios from "axios";

export const getAll = async () => {
  try {
    const res = await axios.get(
      "http://localhost:1337/BookInfos?_sort=created_at:DESC"
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:1337/BookInfos?_sort=created_at:DESC&_start=${
        (page - 1) * limit
      }&_limit=${limit}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllByViewsByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:1337/BookInfos?_sort=views:DESC&_start=${
        (page - 1) * limit
      }&_limit=${limit}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (id) => {
  try {
    const res = await axios.get("http://localhost:1337/BookInfos?id=" + id);
    console.log(res.data);
    return await res.data[0];
  } catch (err) {
    console.log(err);
  }
};

export const getAllByKeyword = async (keyword) => {
  try {
    const res = await axios.get(
      "http://localhost:1337/BookInfos?name_contains=" + keyword
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};
