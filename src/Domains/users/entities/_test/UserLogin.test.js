const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payloads = [{ password: 'secret' }, { username: 'dicoding' }];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payloads = [
      { username: 123, password: 'secret' },
      { username: 'dicoding', password: 123 },
    ];

    // Action & Assert
    payloads.forEach((payload) => {
      expect(() => new UserLogin(payload)).toThrowError(
        'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });
  });

  it('should create UserLogin entities correctly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: '12345',
    };

    // Action
    const userLogin = new UserLogin(payload);

    // Assert
    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual('dicoding');
    expect(userLogin.password).toEqual('12345');
  });
});
