const CommentRepository = require('../../../Domains/comments/CommentRepository');
const Comment = require('../../../Domains/comments/entities/Comment');
const Thread = require('../../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadDetailsUseCase = require('../GetThreadDetailsUseCase');

describe('GetThreadDetailsUseCase', () => {
  it('should orchestrate the get thread details action correctly with replies and deleted replies', async () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();

    const thread = new Thread({
      id: 'thread-123',
      title: 'new title',
      body: 'lorem ipsum',
      user_id: 'user-123',
      username: 'dicoding',
      created_at: createdAt,
      updated_at: updatedAt,
    });

    const parentComment = new Comment({
      id: 'comment-123',
      content: 'lorem ipsum',
      user_id: 'user-123',
      thread_id: 'thread-123',
      parent_comment_id: null,
      created_at: createdAt,
      updated_at: updatedAt,
      is_delete: false,
      username: 'dicoding',
      like_count: 0,
    });

    const replyComment = new Comment({
      id: 'comment-456',
      content: 'this is a reply',
      user_id: 'user-456',
      thread_id: 'thread-123',
      parent_comment_id: 'comment-123',
      created_at: createdAt,
      updated_at: updatedAt,
      is_delete: false,
      username: 'johndoe',
      like_count: 0,
    });

    const deletedReply = new Comment({
      id: 'comment-789',
      content: 'this reply has been deleted',
      user_id: 'user-789',
      thread_id: 'thread-123',
      parent_comment_id: 'comment-123',
      created_at: createdAt,
      updated_at: updatedAt,
      is_delete: true,
      username: 'janedoe',
      like_count: 0,
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getThreadById = jest.fn().mockResolvedValue(thread);
    mockCommentRepository.getAllCommentsByThreadId = jest.fn().mockResolvedValue([
      { ...parentComment },
      { ...replyComment },
      { ...deletedReply },
    ]);

    const useCasePayload = 'thread-123';

    const getThreadDetailsUseCase = new GetThreadDetailsUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const threadDetails = await getThreadDetailsUseCase.execute(useCasePayload);

    // Assert
    expect(threadDetails).toStrictEqual({
      id: 'thread-123',
      title: 'new title',
      body: 'lorem ipsum',
      username: 'dicoding',
      date: thread.createdAt,
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: parentComment.createdAt,
          content: 'lorem ipsum',
          likeCount: 0,
          replies: [
            {
              id: 'comment-456',
              username: 'johndoe',
              date: replyComment.createdAt,
              content: 'this is a reply',
              likeCount: 0,
            },
            {
              id: 'comment-789',
              username: 'janedoe',
              date: deletedReply.createdAt,
              content: '**balasan telah dihapus**',
              likeCount: 0,
            },
          ],
        },
      ],
    });

    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith('thread-123');
    expect(mockCommentRepository.getAllCommentsByThreadId).toHaveBeenCalledWith('thread-123');
  });

  it('should throw error when payload does not contain threadId', async () => {
    // Arrange
    const getThreadDetailsUseCase = new GetThreadDetailsUseCase({});
    const useCasePayload = undefined;

    // Action & Assert
    await expect(getThreadDetailsUseCase.execute(useCasePayload)).rejects.toThrowError('GET_THREAD_DETAILS_USE_CASE.NOT_CONTAIN_THREAD_ID');
  });

  it('should throw error when threadId is not a string', async () => {
    // Arrange
    const getThreadDetailsUseCase = new GetThreadDetailsUseCase({});
    const useCasePayload = 123;

    // Action & Assert
    await expect(getThreadDetailsUseCase.execute(useCasePayload)).rejects.toThrowError('GET_THREAD_DETAILS_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
