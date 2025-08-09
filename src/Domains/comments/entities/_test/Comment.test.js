const Comment = require('../Comment');

describe('Comment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      {
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Action & Assert
    payloads.forEach((payload, index) => {
      if (index === 4) {
        expect(() => new Comment(payload)).not.toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      } else {
        expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      {
        id: 123,
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'thread-123',
        content: 123,
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'thread-123',
        content: 'lorem ipsum',
        user_id: 123,
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'thread-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 123,
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'thread-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: 123,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'thread-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: 123,
        updated_at: new Date(),
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: 123,
        is_delete: false,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: 123,
        username: 'dicoding',
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        thread_id: 'thread-123',
        parent_comment_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_delete: false,
        username: 123,
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
  });

  it('should create Comment entities correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      user_id: 'user-123',
      thread_id: 'thread-123',
      parent_comment_id: null,
      created_at: new Date(),
      updated_at: new Date(),
      is_delete: false,
      username: 'dicoding',
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment).toBeInstanceOf(Comment);
    expect(comment.id).toEqual('comment-123');
    expect(comment.content).toEqual('lorem ipsum');
    expect(comment.owner).toEqual('user-123');
    expect(comment.threadId).toEqual('thread-123');
    expect(comment.parentCommentId).toEqual(null);
    expect(comment.createdAt).toBeInstanceOf(Date);
    expect(comment.createdAt).toEqual(payload.created_at);
    expect(comment.updatedAt).toBeInstanceOf(Date);
    expect(comment.updatedAt).toEqual(payload.updated_at);
    expect(comment.isDelete).toEqual(false);
    expect(comment.username).toEqual('dicoding');
  });

  it('should return deleted comment content correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      user_id: 'user-123',
      thread_id: 'thread-123',
      parent_comment_id: null,
      created_at: new Date(),
      updated_at: new Date(),
      is_delete: true,
      username: 'dicoding',
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment).toBeInstanceOf(Comment);
    expect(comment.id).toEqual('comment-123');
    expect(comment.content).toEqual('**komentar telah dihapus**');
    expect(comment.owner).toEqual('user-123');
    expect(comment.threadId).toEqual('thread-123');
    expect(comment.parentCommentId).toEqual(null);
    expect(comment.createdAt).toBeInstanceOf(Date);
    expect(comment.createdAt).toEqual(payload.created_at);
    expect(comment.updatedAt).toBeInstanceOf(Date);
    expect(comment.updatedAt).toEqual(payload.updated_at);
    expect(comment.isDelete).toEqual(true);
    expect(comment.username).toEqual('dicoding');
  });
});
