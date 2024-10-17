import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../config/index.js';
import { User } from '../modules/User/user.model.js';
import catchAsync from '../helpers/catchAsync.js';  
import ApiError from '../errors/ApiError.js';
import  USER_ROLE  from '../modules/User/user.constant.js';

const isAdmin = () => {
  return catchAsync(async (req, res, next) => {

    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization token missing or malformed');
      }
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtAccessSecret);
      const { role, email } = decoded;
      const user = await User.isUserExistsByEmail(email);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found!');
      }

      if (user.isDeleted) {
        throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted!');
      }

      if (user.status === 'blocked') {
        throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked!');
      }
      if (role !== USER_ROLE.admin) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized! Only admin access');
      }
      req.user = decoded;
      console.log(req.user);
      next();
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized! Please login....');
    }
  });
};

export default isAdmin;