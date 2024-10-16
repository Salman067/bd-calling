import { UserServices } from './user.service.js'; // Ensure this import is correct
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import sendResponse from '../../helpers/sendResponse.js';

// Example controller functions
export const UserControllers = {
  registerUser: async (req, res) => {
    try{
      const result = await UserServices.registerUserFromDB(req.body);
      return sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Thanks for registering!',
        data: result,
      });
    }catch(error){
      if(error instanceof ApiError){
        return sendResponse(res, {
          statusCode: error.statusCode,
          success: false,
          message: error.message,
        });
      }
      console.error('Error registering user:', error);
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'An error occurred while registering user.',
      });
    }

  },

  loginUser: async (req, res) => {
    const result = await UserServices.loginUserFromDB(req.body);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful!',
      data: result,
    });
  },

 getAllUser: async (req, res, next) => {
    try {
        const paginationParameter = req.query;
        const users = await UserServices.getAllUser();
        return sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'all user list!',
          data: users,
        });
    } catch (error) {
        next(error);
    }
}
};


