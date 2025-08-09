const NewThread = require('../NewThread');

describe('NewThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      {},
      { title: 'valid title' },
      { body: 'valid body' },
      { title: '', body: 'valid body' },
      { title: 'valid title', body: '' },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      { title: true, body: 'lorem ipsum' },
      { title: 'title', body: 123 },
      { title: {}, body: 'ipsum' },
      { title: 'title', body: [] },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new NewThread(payload)).toThrowError(
        'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create NewThread entities correctly', () => {
    // Arrange
    const payload = {
      title: 'new title',
      body: 'lorem ipsum',
    };

    // Action
    const newThread = new NewThread(payload);

    // Assert
    expect(newThread).toBeInstanceOf(NewThread);
    expect(newThread.title).toEqual('new title');
    expect(newThread.body).toEqual('lorem ipsum');
  });
});
