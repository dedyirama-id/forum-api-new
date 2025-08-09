const AddedThread = require('../AddedThread');

describe('AddedThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      {
        title: 'new title',
        user_id: 'user-123',
      },
      {
        id: 'thread-123',
        user_id: 'user-123',
      },
      {
        id: 'thread-123',
        title: 'new title',
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new AddedThread(payload)).toThrowError(
        'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
      );
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      {
        id: 123,
        title: 'new title',
        user_id: 'user-123',
      },
      {
        id: 'thread-123',
        title: 123,
        user_id: 'user-123',
      },
      {
        id: 'thread-123',
        title: 'new title',
        user_id: 123,
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new AddedThread(payload)).toThrowError(
        'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create AddedThread entities correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'new title',
      user_id: 'user-123',
    };

    // Action
    const thread = new AddedThread(payload);

    // Assert
    expect(thread).toBeInstanceOf(AddedThread);
    expect(thread.id).toEqual('thread-123');
    expect(thread.title).toEqual('new title');
    expect(thread.owner).toEqual('user-123');
  });
});
