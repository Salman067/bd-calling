import mongoose from 'mongoose';
import httpStatus from 'http-status';

const handleCastError = (err) => {
  const errorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: httpStatus['400_MESSAGE'],
    errorSources,
  };
};

export default handleCastError;
