import entryModel from '../model/entryModel';

class Entry {

  static getEntries (req, res) {

    if (entryModel.length < 1) {

      return res.status(404).json({
        error: 404,
        message: 'Entry not found'
      });

} else if (entryModel.length >= 1) {

      return res.status(200).json({
        entryModel
      });

}

return res.status(404).json({
      error: 400,
      message: 'Bad request'
    });

}

}
export default Entry;