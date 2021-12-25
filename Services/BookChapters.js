import axios from "axios";
const url = "http://localhost:1337/";

export const getAll = async () => {
  try {
    const res = await axios.get(url + "BookChapters?_sort=created_at:DESC");
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `${url}BookChapters?_sort=created_at:DESC&_start=${
        (page - 1) * limit
      }&_limit=${limit}`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (idbook, chapternumber) => {
  try {
    const res = await axios.get(
      url +
        "BookChapters?bookinfo.id=" +
        idbook +
        "&chapternumber=" +
        chapternumber
    );
    if (res.data.length > 0) return await res.data[0];
    return null;
  } catch (err) {
    console.log(err);
  }
};

export const getByBook = async (id) => {
  try {
    const res = await axios.get(
      url + "BookChapters?bookinfo.id=" + id.toString()
    );
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};
