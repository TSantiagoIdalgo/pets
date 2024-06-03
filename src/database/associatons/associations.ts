import Chat from '../tables/chat';
import User from '../tables/user';
import Messages from '../tables/messages';
import ApplicationSheet from '../tables/application-sheet';
import Advertisement from '../tables/advertisement';
import Animal from '../tables/animal';

// N - M users and chats

User.belongsToMany(Chat, { 
  through: 'user_chats',
  foreignKey: 'user_id',
  otherKey: 'chat_id',
  timestamps: false 
});

Chat.belongsToMany(User, {
  through: 'user_chats',
  foreignKey: 'chat_id',
  otherKey: 'user_id',
  timestamps: false
});

// 1 - N chat and messages

Chat.hasMany(Messages, {
  foreignKey: 'chat_id',
  sourceKey: 'chat_id'
});

Messages.belongsTo(Chat, {
  foreignKey: 'chat_id',
  targetKey: 'chat_id'
});

// 1 - n Users and Messages

User.hasMany(Messages, {
  foreignKey: 'user_id',
  sourceKey: 'email'
});

Messages.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'email'
});

// 1 - 1 User and applicationSheet

User.hasOne(ApplicationSheet, {
  foreignKey: 'user_id',
  sourceKey: 'email'
});

// 1 - N User and Advertisement

User.hasMany(Advertisement, {
  foreignKey: 'user_id',
  sourceKey: 'email'
});

Advertisement.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'email'
});

// 1 - N User and Animal

User.hasMany(Animal, {
  foreignKey: 'user_id',
  sourceKey: 'email'
});

Animal.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'email'
});
