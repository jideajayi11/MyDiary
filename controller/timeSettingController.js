import userModel from '../model/userModel';

class Time {

    static getTime (req, res) {

        const id = parseInt(req.params.id, 10);
        const user = userModel.filter((item) => item.id === id);
        if (user.length > 0) {

          return res.status(200).json({
            user
          });

    }

          return res.status(404).json({
            error: 404,
            message: 'User id not found'
          });

      }

    static setTime (req, res) {

        const user = userModel.
        filter((item) => item.id === parseInt(req.params.id, 10));
        if (req.body.time !== undefined) {

          user[0].reminderTime = req.body.time;

    }
        const index = userModel.
        findIndex((item) => item.id === parseInt(req.params.id, 10));
        if (index >= 0) {

          userModel.splice(index, 1, {
            dateAdded: user[0].dateAdded,
            email: user[0].email,
            fullName: user[0].fullName,
            id: user[0].id,
            password: user[0].password,
            reminderTime: user[0].reminderTime
          });

    return res.status(200).json({
            message: 'Entry updated',
            user
          });

    }

    return res.status(404).json({
          error: 404,
          message: 'Entry not found'
        });

      }

}
export default Time;