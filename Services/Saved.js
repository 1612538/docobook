import axios from "axios";
const url = "http://localhost:1337/";
import { getOneByID as getChapter } from "./BookChapters";

export const getByUser = async (id) => {
  try {
    const res = await axios.get(
      url + "Saved-Lists?_sort=created_at:DESC&user.id=" + id
    );
    for (let i of res.data) {
      const bookchapter = await getChapter(i.bookchapter.id);
      i.bookchapter = bookchapter;
    }
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const AddSaved = async (data) => {
  try {
    const res = await axios.post(url + "Saved-Lists", data);
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (iduser, idchapter) => {
  try {
    const res = await axios.get(
      url + "Saved-Lists?bookchapter.id=" + idchapter + "&user.id=" + iduser
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
    const res = await axios.delete(url + "Saved-Lists/" + id);
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
