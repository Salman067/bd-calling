import httpStatus from 'http-status';

const handleDuplicateError = (err) => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources = [
    {
      path: '',
      message: `'${extractedMessage}' is already exists`,
    },
  ];

  return {
    statusCode: httpStatus.CONFLICT,
    message: `Request conflict: '${extractedMessage}' is already in use.`,
    errorSources,
  };
};

export default handleDuplicateError;
