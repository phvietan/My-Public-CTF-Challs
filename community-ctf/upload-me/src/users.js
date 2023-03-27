const crypto = require('crypto');
require('dotenv').config();

const ROLE = {
  ADMIN: 0,
  USER: 1,
};

class Users {
  users = [{
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    role: ROLE.ADMIN,
  }];

  sessions = [{
    id: process.env.ADMIN_SESSION,
    userIndex: 0,
  }];

  validator(data) {
    return (typeof data === 'string');
  }

  register(username, password) {
    if (!this.validator(username) || !this.validator(password)) throw "VALIDATION_ERR: username or password has wrong type";
    const existedUser = this.users.find(u => u.username === username);
    if (existedUser) throw "EXISTED_ERR: username already exist";
    this.users.push({
      username,
      password,
      role: ROLE.USER,
    });
  }

  login(username, password) {
    if (!this.validator(username) || !this.validator(password)) throw "VALIDATION_ERR: username or password has wrong type";
    const userIndex = this.users.findIndex(u => u.username === username);
    const user = this.users[userIndex];
    if (!user || user.password !== password) throw "WRONGAUTH_ERR: wrong username or password";
    const id = crypto.randomBytes(16).toString('hex');
    this.sessions.push({
      id,
      userIndex,
    });
    return id;
  }

  getUser(sessionId) {
    const sess = this.sessions.find(s => s.id === sessionId);
    if (!sess) return undefined;
    const { userIndex } = sess;
    return this.users[userIndex];
  }
}

module.exports = {
  MyUsers: new Users(),
  ROLE,
}