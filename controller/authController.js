import userModel from '../model/userModel';

class Auth{

    static addUser (req, res) {
      if (!(req.body.email) || !(req.body.fullName) || !(req.body.password)) {
        return res.status(400).json({
          error: 400,
          message: 'Incomplete parameters'
        });
      }
      const lastId = userModel[userModel.length - 1].id;
      //const id = parseInt(lastId, 10) + 1;
      const dateAdded = Date.now();
      userModel.push({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        dateAdded,
        id: parseInt(lastId, 10) + 1,
        reminderTime: '07:00 am'
      });
      return res.status(201).json({
        userModel,
        message: 'new user added'
      });
    }
    
}
export default Auth;