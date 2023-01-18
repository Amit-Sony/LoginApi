const User = require("../model/userlogin");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    // console.log(`user : ${user}`)

    if (user) {
      const dbPass = user.password;
      const passmatch = await bcrypt.compare(password, dbPass);
      if (passmatch) {
        res.status(403).json({
          sucess: false,
          message: `${user.username} Already exist please login`,
        });
      } else {
        let hashpass = await bcrypt.hash(password, 10);
        const userdata = new User({
          username: username,
          password: hashpass,
        });

        const data = await userdata.save();
        res.status(200).json({
          sucess: true,
          message: "User signup sucessfull",
          data,
        });
      }
    } else {
      let hashpass = await bcrypt.hash(password, 10);
      const userdata = new User({
        username: username,
        password: hashpass,
      });

      const data = await userdata.save();
      res.status(200).json({
        sucess: true,
        message: "User signup sucessfull",
        data,
      });
    }
  } catch {
    (err) => {
      res.status(500).json({
        sucess: false,
        message: "Internal server error",
        err,
      });
    };
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  console.log(`user : ${user}`);
  try {
    if (user) {
      const passmatch = await bcrypt.compare(password, user.password);
      if (passmatch) {
        res.status(200).json({
          sucess: true,
          message: `Logged in as ${username}`,
          user,
        });
      } else {
        res.status(404).json({
          sucess: false,
          message: `password does not match`,
        });
      }
    } else {
      res.status(404).json({
        sucess: false,
        message: `${username} is not registered please register`,
      });
    }
  } catch {
    (err) => {
      res.status(500).json({
        sucess: false,
        err: err.p,
      });
    };
  }
};

module.exports = { signup, login };
