const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should throw error when add thread with invalid owner id', async () => {
    // Arange
    const useCasePayload = {
      title: 'New thread',
      body: 'lorem ipsum',
    };

    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    mockUserRepository.getUserById = jest.fn().mockRejectedValue(new NotFoundError('thread tidak ditemukan'));
    mockThreadRepository.addThread = jest.fn().mockResolvedValue();

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
    });

    // Action & Assert
    await expect(addThreadUseCase.execute('invalid-user', useCasePayload)).rejects.toThrowError(new NotFoundError('thread tidak ditemukan'));

    expect(mockUserRepository.getUserById).toHaveBeenCalledWith('invalid-user');
    expect(mockThreadRepository.addThread).not.toBeCalled();
  });

  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'New thread',
      body: 'lorem ipsum',
    };
    const mockThread = new AddedThread({
      id: 'thread-123',
      user_id: 'user-123',
      title: useCasePayload.title,
    });
    const mockRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: 'dicoding',
      fullname: 'dicoding indonesia',
      password: 'secret',
    });

    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    mockThreadRepository.addThread = jest.fn().mockResolvedValue(mockThread);
    mockUserRepository.getUserById = jest.fn().mockResolvedValue(mockRegisteredUser);

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute('user-123', useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-123',
      user_id: 'user-123',
      title: 'New thread',
    }));

    expect(mockThreadRepository.addThread).toHaveBeenCalledTimes(1);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith('user-123', new NewThread({
      title: 'New thread',
      body: 'lorem ipsum',
    }));
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith('user-123');
  });
});
