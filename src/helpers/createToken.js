import jwt from 'jsonwebtoken';

// Function to create a token
const createToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn });
};

export default createToken;
