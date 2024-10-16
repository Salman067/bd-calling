
import handleValidationError from '../errors/handleValidationError.js';
import handleCastError from '../errors/handleCastError.js';
import handleDuplicateError from '../errors/handleDuplicateError.js';
import ApiError from '../errors/ApiError.js';
import config from '../config/index.js';
import httpStatus from 'http-status';



const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err?.message || httpStatus['500_MESSAGE'];
  let errorSources = [
    {
      path: '',
      message: err?.message || httpStatus['500_MESSAGE'],
    },
  ];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.nodeEnv === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;