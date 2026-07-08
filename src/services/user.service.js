import { users } from '../data/users.js';

export function getUser(message) {
  const matchingUsers = users.filter((user) => user.name === message.user);

  return {
    success: matchingUsers.length > 0,
    data: matchingUsers.length > 0 ? matchingUsers : 'not found',
  };
}

export function getAllUsers() {
  return {
    success: true,
    data: users,
  };
}
