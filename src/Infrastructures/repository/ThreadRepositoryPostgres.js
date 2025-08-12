const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const Thread = require('../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(userId, newThread) {
    const { title, body } = newThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads (id, user_id, title, body) VALUES($1, $2, $3, $4) RETURNING id, user_id, title',
      values: [id, userId, title, body],
    };
    const { rows } = await this._pool.query(query);
    const row = rows[0];

    return new AddedThread({
      id: row.id,
      title: row.title,
      user_id: row.user_id,
    });
  }

  async getThreadById(id) {
    const query = {
      text: `
        SELECT 
          t.*,
          u.username
        FROM threads t
        JOIN users u ON t.user_id = u.id
        WHERE 
          t.id = $1
        `,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return new Thread(result.rows[0]);
  }

  async verifyThreadAvailability(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('thread tidak ditemukan');
    }
  }
}

module.exports = ThreadRepositoryPostgres;
