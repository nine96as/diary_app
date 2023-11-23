const db = require('../database/connect');

class Entry {
  constructor({ entry_id, user_id, title, content, date }) {
    this.id = entry_id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.date = date;
  }

  static async getAll() {
    const resp = await db.query('SELECT * FROM entries');
    return resp.rows.map((p) => new Entry(p));
  }

  static async getOneById(id) {
    const resp = await db.query('SELECT * FROM entries WHERE entry_id = $1', [
      id
    ]);
    if (resp.rows.length !== 1) {
      throw new Error('Unable to locate entry.');
    }
    return new Entry(resp.rows[0]);
  }

  static async create(data) {
    const { title, content, user_id } = data;
    let resp = await db.query(
      'INSERT INTO entries (title, content, user_id) VALUES ($1, $2, $3) RETURNING entry_id;',
      [title, content, user_id]
    );
    const newId = resp.rows[0].entry_id;
    const newEntry = await Entry.getOneById(newId);
    return newEntry;
  }

  async destroy() {
    let resp = await db.query(
      'DELETE FROM entries WHERE entry_id = $1 RETURNING *;',
      [this.id]
    );
    return new Entry(resp.rows[0]);
  }
}

module.exports = Entry;
