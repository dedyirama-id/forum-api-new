const RegisterUser = require('../RegisterUser');

describe('RegisterUser entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [
      { password: 'abc', fullname: 'abc' },
      { username: 'abc', fullname: 'abc' },
      { username: 'abc', password: 'abc' },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new RegisterUser(payload)).toThrowError(
        'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY',
      );
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      { username: 123, fullname: 'abc', password: 'abc' },
      { username: 'abc', fullname: true, password: 'abc' },
      { username: 'abc', fullname: 'abc', password: true },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new RegisterUser(payload)).toThrowError(
        'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should throw error when username contains more than 50 characters', () => {
    // Arrange
    const payload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      fullname: 'Dicoding Indonesia',
      password: 'abc',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: 'dico ding',
      fullname: 'dicoding',
      password: 'abc',
    };

    // Action & Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER',
    );
  });

  it('should create RegisterUser entities correctly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'abc',
    };

    // Action
    const { username, fullname, password } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual('dicoding');
    expect(fullname).toEqual('Dicoding Indonesia');
    expect(password).toEqual('abc');
  });
});
