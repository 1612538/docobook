import axios from "axios";
const url = "http://localhost:1337/";

export const AddComment = async (data) => {
  try {
    const res = await axios.post(url + "Comments", data);
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getByChapter = async (id) => {
  try {
    let res = await axios.get(
      url + "Comments?_sort=created_at:DESC&bookchapter.id=" + id
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getByBook = async (id) => {
  try {
    let res = await axios.get(
      url + "Comments?_sort=created_at:DESC&bookchapter.bookinfo=" + id
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
