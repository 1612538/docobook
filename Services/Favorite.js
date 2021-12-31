import axios from "axios";
const url = "http://localhost:1337/";
import { getOne as getBookInfo } from "./Books";

export const getByUser = async (id) => {
  try {
    let res = await axios.get(
      url + "Favor-Lists?_sort=created_at:DESC&user.id=" + id
    );
    for (let i of res.data) {
      const bookinfo = await getBookInfo(i.bookinfo.id);
      i.bookinfo = bookinfo;
    }
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const AddFavorite = async (data) => {
  try {
    const res = await axios.post(url + "Favor-Lists", data);
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (iduser, idbook) => {
  try {
    const res = await axios.get(
      url + "Favor-Lists?bookinfo.id=" + idbook + "&user.id=" + iduser
    );
    if (res.data.length > 0) return res.data[0];
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteOne = async (id) => {
  try {
    const res = await axios.delete(url + "Favor-Lists/" + id);
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
