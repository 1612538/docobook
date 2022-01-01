import axios from "axios";
const url = "http://localhost:1337/";

export const getAll = async () => {
  try {
    const res = await axios.get(url + "BookInfos?_sort=created_at:DESC");
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `${url}BookInfos?_sort=created_at:DESC&_start=${
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
      `${url}BookInfos?_sort=views:DESC&_start=${
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
    const res = await axios.get(url + "BookInfos?id=" + id);
    return await res.data[0];
  } catch (err) {
    console.log(err);
  }
};

export const getAllByKeyword = async (keyword) => {
  try {
    const res = await axios.get(url + "BookInfos?name_contains=" + keyword);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllByUploader = async (id) => {
  try {
    const res = await axios.get(url + "BookInfos?uploader.id=" + id);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllByCategory = async (id) => {
  try {
    const res = await axios.get(
      url + "BookInfos?_sort=created_at:DESC&categories.id_in=" + id
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllByCountry = async (id) => {
  try {
    const res = await axios.get(
      url + "BookInfos?_sort=created_at:DESC&country.id_in=" + id
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const AddBook = async (data) => {
  try {
    const res = await axios.post(url + "BookInfos", data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateBook = async (data) => {
  try {
    const id = JSON.parse(data.get("data")).id;
    const res = await axios.put(url + "BookInfos/" + id, data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const Update = async (data) => {
  try {
    const id = data.id;
    const res = await axios.put(url + "BookInfos/" + id, data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};
