const Entry = require('../models/Entry');
const Token = require('../models/Token');
const User = require('../models/User');

const index = async (req, res) => {
  try {
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);

    const entries = await Entry.getAll();

    res.json(entries);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);

    const result = await Entry.create({ ...data, user_id: token.user_id });
    res.status(201).send(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const entry = await Entry.getOneById(id);
    res.json(entry);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);
    const user = await User.getOneById(token.user_id);

    const entry = await Entry.getOneById(id);

    if (post.user_id === user.id || user.isAdmin) {
      const result = await entry.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({
        error: 'You must be an admin or the entry author to delete the entry!'
      });
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = {
  index,
  create,
  show,
  destroy
};
