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
    
    static authUsers (req, res) {
      const user = userModel.
      filter((item) => item.email === req.body.email);
      if (user.length) {
        if(user[0].password === req.body.password) {
          /*const token = jwt.sign({email: req.body.email}, 
            'superSecret');*/
          return res.status(200).json({
            user,
            message: 'Logged in'
          });
          
        }else {
          return res.status(404).json({ 
            error: 404, 
            message: 'Authentication failed. Invalid password.' 
          });
        }
        
      }else {
        return res.status(404).json({ 
          error: 404, 
          message: 'Authentication failed. User not found.' 
        });
      }
      

    }
}
export default Auth;