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

static addEntry (req, res) {

  if (req.body.title === undefined || req.body.content === undefined) {

    return res.status(400).json({
      error: 400,
      message: 'Incomplete parameters'
    });

}
  const lastId = entryModel[entryModel.length - 1].id;
  const id = parseInt(lastId, 10) + 1;
  const dateAdded = Date.now();
  entryModel.push({
    content: req.body.content,
    dateAdded,
    id,
    title: req.body.title
  });

return res.status(201).json({
    id,
    title: req.body.title,
    content: req.body.content,
    dateAdded,
    message: 'new entry added'
  });

}

static updateEntry (req, res) {

  const entry = entryModel.
  filter((item) => item.id === parseInt(req.params.id, 10));
  if (req.body.title !== undefined) {

    entry[0].title = req.body.title;

}
  if (req.body.content !== undefined) {

    entry[0].content = req.body.content;

}
  const index = entryModel.
  findIndex((item) => item.id === parseInt(req.params.id, 10));
  if (index >= 0) {

    entryModel.splice(index, 1, {
      content: entry[0].content,
      dateAdded: entry[0].dateAdded,
      id: entry[0].id,
      title: entry[0].title
    });

return res.status(200).json({
      entry,
      message: 'Entry updated'
    });

}

return res.status(404).json({
    error: 404,
    message: 'Entry not found'
  });

}

}
export default Entry;