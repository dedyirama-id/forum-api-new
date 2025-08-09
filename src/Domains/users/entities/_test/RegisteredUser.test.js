const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      { username: 'dicoding', fullname: 'Dicoding Indonesia' },
      { id: 'user-123', fullname: 'Dicoding Indonesia' },
      { id: 'user-123', username: 'dicoding' },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new RegisteredUser(payload)).toThrowError(
        'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY',
      );
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      { id: 123, username: 'dicoding', fullname: 'Dicoding Indonesia' },
      { id: 'user-123', username: 123, fullname: 'Dicoding Indonesia' },
      { id: 'user-123', username: 123, fullname: 'Dicoding Indonesia' },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new RegisteredUser(payload)).toThrowError(
        'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create RegisteredUser entity correctly', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual('user-123');
    expect(registeredUser.username).toEqual('dicoding');
    expect(registeredUser.fullname).toEqual('Dicoding Indonesia');
  });
});
