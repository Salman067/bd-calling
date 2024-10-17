// const { Schema, model, Types } = require('mongoose');
// const { USER_ROLE } = require('./user.constant');

// const IUserSchema = new Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: Object.values(USER_ROLE),
//     required: true,
//   },
//   isDeleted: {
//     type: Boolean,
//     default: false,
//   },
//   isBlocked: {
//     type: Boolean,
//     default: false,
//   },
//   status: {
//     type: String,
//     enum: ['in-progress', 'blocked'],
//     default: 'in-progress',
//   },
// });

// // Static method to check if user exists by email
// IUserSchema.statics.isUserExistsByEmail = async function (email) {
//   return await this.findOne({ email });
// };

// // Creating the model
// const User = model('User', IUserSchema);

// module.exports = {
//   User,
// };
