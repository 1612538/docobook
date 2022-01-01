import axios from "axios";
const url = "http://localhost:1337/";

export const AddRating = async (data) => {
  try {
    const res = await axios.post(url + "Ratings", data);
    return await res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOne = async (iduser, idbook) => {
  try {
    const res = await axios.get(
      url + "Ratings?bookinfo.id=" + idbook + "&user.id=" + iduser
    );
    if (res.data.length > 0) return res.data[0];
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
