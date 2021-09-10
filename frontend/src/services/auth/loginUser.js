import axios from "../axios";
const loginUser = async (user) => {
  try {
    console.log("holaaaaa agus");
    const data = await axios().post("http://localhost:8001/register", {
      username: user.email,
      password: user.password,
    });
    console.log("data de loginUser =>", data.data);
    return data.data;
  } catch (error) {
    return null;
  }
};

export default loginUser;
