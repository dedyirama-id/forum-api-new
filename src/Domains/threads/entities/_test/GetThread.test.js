const GetThread = require('../GetThread');

describe('GetThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      {
        title: 'new title',
        body: 'lorem ipsum',
        username: 'dicoding',
        created_at: new Date(),
      },
      {
        id: 'thread-123',
        body: 'lorem ipsum',
        username: 'dicoding',
        created_at: new Date(),
      },
      {
        id: 'thread-123',
        title: 'new title',
        username: 'dicoding',
        created_at: new Date(),
      },
      {
        id: 'thread-123',
        title: 'new title',
        body: 'lorem ipsum',
        created_at: new Date(),
      },
      {
        id: 'thread-123',
        title: 'new title',
        body: 'lorem ipsum',
        username: 'dicoding',
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      {
        id: 123,
        title: 'new title',
        body: 'lorem ipsum',
        username: 'dicoding',
        created_at: 'user-123',
      },
      {
        id: 'thread-123',
        title: 123,
        body: 'lorem ipsum',
        username: 'dicoding',
        created_at: 'user-123',
      },
      {
        id: 'thread-123',
        title: 'new title',
        body: 123,
        username: 'dicoding',
        created_at: 'user-123',
      },
      {
        id: 'thread-123',
        title: 'new title',
        body: 'lorem ipsum',
        username: 123,
        created_at: 'user-123',
      },
      {
        id: 'thread-123',
        title: 'new title',
        body: 'lorem ipsum',
        username: 'dicoding',
        created_at: 123,
      },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new GetThread(payload)).toThrowError(
        'GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create GetThread entities correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'new title',
      body: 'lorem ipsum',
      username: 'dicoding',
      created_at: new Date(),
    };

    // Action
    const thread = new GetThread(payload);

    // Assert
    expect(thread).toBeInstanceOf(GetThread);
    expect(thread.id).toEqual('thread-123');
    expect(thread.title).toEqual('new title');
    expect(thread.body).toEqual('lorem ipsum');
    expect(thread.username).toEqual('dicoding');
    expect(thread.date).toBeInstanceOf(Date);
    expect(thread.date).toEqual(payload.created_at);
  });
});
