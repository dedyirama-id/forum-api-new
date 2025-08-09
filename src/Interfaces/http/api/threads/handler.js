const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const GetThreadDetailsUseCase = require('../../../../Applications/use_case/GetThreadDetailsUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postCommentToThreadByThreadIdHandler = this.postCommentToThreadByThreadIdHandler.bind(this);
    this.deleteCommentByIdHandler = this.deleteCommentByIdHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
    this.postCommentRepliesByCommentIdAndThreadId = this.postCommentRepliesByCommentIdAndThreadId.bind(this);
    this.deleteCommentRepliesByRepliesId = this.deleteCommentRepliesByRepliesId.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);

    const addedThread = await addThreadUseCase.execute(userId, request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadByIdHandler(request, h) {
    const { threadId } = request.params;
    const getThreadDetailsUseCase = this._container.getInstance(GetThreadDetailsUseCase.name);

    const thread = await getThreadDetailsUseCase.execute(threadId);

    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }

  async postCommentToThreadByThreadIdHandler(request, h) {
    const { threadId } = request.params;
    const { id: userId } = request.auth.credentials;

    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);

    const addedComment = await addCommentUseCase.execute(threadId, userId, request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentByIdHandler(request, h) {
    const { commentId } = request.params;
    const { id: userId } = request.auth.credentials;

    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);

    const addedComment = await deleteCommentUseCase.execute(commentId, userId);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(200);
    return response;
  }

  async postCommentRepliesByCommentIdAndThreadId(request, h) {
    const { threadId, commentId } = request.params;
    const { id: userId } = request.auth.credentials;
    const { content } = request.payload;

    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);

    const addedReply = await addCommentUseCase.execute(threadId, userId, {
      content,
      parentCommentId: commentId,
    });

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentRepliesByRepliesId(request, h) {
    const { replyId } = request.params;
    const { id: userId } = request.auth.credentials;

    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);

    const addedComment = await deleteCommentUseCase.execute(replyId, userId);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
