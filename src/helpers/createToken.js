import jwt from 'jsonwebtoken';

// Function to create a JWT token
const createToken = (jwtPayload, secret, expiresIn) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export default createToken;
