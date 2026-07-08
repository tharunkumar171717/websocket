import {
  getAllUsers,
  getUser,
} from '../services/user.service.js';

export const websocketRoutes = {
  GET_USER: getUser,
  GET_ALL_USERS: getAllUsers,
};
