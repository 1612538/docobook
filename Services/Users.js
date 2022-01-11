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

export const deleteOne = async (id) => {
  try {
    const res = await axios.delete(url + "users/" + id);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateUser = async (data) => {
  try {
    const id = JSON.parse(data.get("data")).id;
    const jsonData = JSON.stringify(data);
    const res = await axios.put(url + "users/" + id, jsonData);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const BlockUser = async (data) => {
  try {
    if (data === null) return [];
    data.blocked = true;
    const res = await UpdateUser(data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const UnBlockUser = async (data) => {
  try {
    if (data === null) return [];
    data.blocked = false;
    const res = await UpdateUser(data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const PromoteToAdmin = async (data) => {
  try {
    if (data === null) return [];
    data.userRole = 2;
    const res = await UpdateUser(data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const PromoteToManager = async (data) => {
  try {
    if (data === null) return [];
    data.userRole = 1;
    const res = await UpdateUser(data);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};