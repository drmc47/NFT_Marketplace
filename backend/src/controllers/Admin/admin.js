const Users = require("../../models/User");

async function getUsersDb() {
  try {
    const users = await Users.find({ roles: "613bd8b725b8702ce89f7473" });

    return users;
  } catch (err) {
    console.log(err);
  }
}

let getUsers = async (_req, res, next) => {
  try {
    let allUsers = await getUsersDb();
    console.log(allUsers);
    var all = allUsers.map((p) => {
      var obj = p.username;
      var image = p.profilePic;
      var combined = obj + " " + image;
      return combined;
    });
    return res.json(all);
  } catch (error) {
    next("Error");
  }
};

async function updateAdminById(req, res, next) {
  try {
    const id = req.params.id;
    const { username, roles, firstName, lastName } = req.body;
    let newUser = {
      username,
      roles,
      firstName,
      lastName,
    };
    const update = await Users.findByIdAndUpdate({ _id: id }, newUser);

    return res.send(update);
  } catch (error) {
    next("error");
    res.send("fail edit user");
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    let names = await Users.findById({ _id: id });
    return res.json(names);
  } catch (error) {
    return res.json(error);
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const mail = await Users.findByIdAndDelete({ _id: id });
    if (!mail) {
      res.send("not found user");
    } else {
      res.send("User Deleted");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, updateAdminById, getUserById, deleteUser };
