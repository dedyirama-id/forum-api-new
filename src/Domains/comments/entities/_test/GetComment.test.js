const GetComment = require('../GetComment');

describe('GetComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      {
        content: 'lorem ipsum',
        username: 'dicoding',
        created_at: new Date(),
        is_delete: false,
      },
      {
        id: 'comment-123',
        username: 'dicoding',
        created_at: new Date(),
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        created_at: new Date(),
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        username: 'dicoding',
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        username: 'dicoding',
        created_at: new Date(),
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new GetComment(payload)).toThrowError('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      {
        id: 123,
        content: 'lorem ipsum',
        username: 'dicoding',
        created_at: new Date(),
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 123,
        username: 'dicoding',
        created_at: new Date(),
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        username: 123,
        created_at: new Date(),
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        username: 'dicoding',
        created_at: 123,
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        username: 'dicoding',
        created_at: new Date(),
        is_delete: 123,
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new GetComment(payload)).toThrowError(
        'GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create GetComment entities correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      username: 'dicoding',
      created_at: new Date(),
      is_delete: false,
    };

    // Action
    const comment = new GetComment(payload);

    // Assert
    expect(comment).toBeInstanceOf(GetComment);
    expect(comment.id).toEqual('comment-123');
    expect(comment.content).toEqual('lorem ipsum');
    expect(comment.username).toEqual('dicoding');
    expect(comment.date).toBeInstanceOf(Date);
    expect(comment.date).toEqual(payload.created_at);
  });

  it('should return deleted comment content correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      username: 'dicoding',
      created_at: new Date(),
      is_delete: true,
    };

    // Action
    const comment = new GetComment(payload);

    // Assert
    expect(comment).toBeInstanceOf(GetComment);
    expect(comment.id).toEqual('comment-123');
    expect(comment.content).toEqual('**komentar telah dihapus**');
    expect(comment.username).toEqual('dicoding');
    expect(comment.date).toBeInstanceOf(Date);
    expect(comment.date).toEqual(payload.created_at);
  });
});
