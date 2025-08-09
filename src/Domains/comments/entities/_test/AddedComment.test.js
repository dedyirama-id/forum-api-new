const AddedComment = require('../AddedComment');

describe('AddedComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      {
        content: 'lorem ipsum',
        user_id: 'user-123',
        is_delete: false,
      },
      {
        id: 'comment-123',
        user_id: 'user-123',
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        is_delete: false,
      },
      {
        id: 'comment-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new AddedComment(payload)).toThrowError(
        'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
      );
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      {
        id: 123,
        content: 'lorem ipsum',
        user_id: 'user-123',
        is_delete: false,
      },
      {
        id: 'thread-123',
        content: 123,
        user_id: 'user-123',
        is_delete: false,
      },
      {
        id: 'thread-123',
        content: 'lorem ipsum',
        user_id: 123,
        is_delete: false,
      },
      {
        id: 'thread-123',
        content: 'lorem ipsum',
        user_id: 'user-123',
        is_delete: 123,
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new AddedComment(payload)).toThrowError(
        'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create AddedComment entities correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      user_id: 'user-123',
      is_delete: false,
    };

    // Action
    const comment = new AddedComment(payload);

    // Assert
    expect(comment).toBeInstanceOf(AddedComment);
    expect(comment.id).toEqual('comment-123');
    expect(comment.content).toEqual('lorem ipsum');
    expect(comment.owner).toEqual('user-123');
  });

  it('should return deleted comment content correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      user_id: 'user-123',
      is_delete: true,
    };

    // Action
    const comment = new AddedComment(payload);

    // Assert
    expect(comment).toBeInstanceOf(AddedComment);
    expect(comment.id).toEqual('comment-123');
    expect(comment.content).toEqual('**komentar telah dihapus**');
    expect(comment.owner).toEqual('user-123');
  });
});
