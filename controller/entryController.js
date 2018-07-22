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

static getEntry (req, res) {

  const entry = entryModel.
  filter((item) => item.id.toString() === req.params.id);
  if (entry.length > 0) {

    return res.status(200).json({
      entry
    });

}

return res.status(404).json({
    error: 404,
    message: 'Entry id not found'
  });

}


}
export default Entry;