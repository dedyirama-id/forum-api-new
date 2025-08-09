/* eslint-disable camelcase */
/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },

  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async addThread({
    id = 'thread-123', owner = 'user-123', title = 'new title', body = 'lorem ipsum',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
      values: [id, owner, title, body],
    };

    await pool.query(query);
  },

  async getAllThreads() {
    const query = {
      text: 'SELECT * FROM threads',
    };

    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = ThreadsTableTestHelper;
