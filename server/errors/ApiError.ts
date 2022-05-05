class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  static Forbidden(message: string) {
    return new ApiError(403, message);
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static Unauthorized(message: string) {
    return new ApiError(401, message);
  }

  static oAuthError(code: number, message: string) {
    return new ApiError(code, message);
  }
}

export default ApiError;
