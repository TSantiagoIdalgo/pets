import { IUser } from '#src/types/user.type';

export const users: IUser[] = [
  {
    email: 'testing@gmail.com',
    name: 'testing',
    password: '@Test123',
    role: 'adopter'
  },
  {
    email: 'testing2@gmail.com',
    name: 'testing2',
    password: '@Test123',
    role: 'rescuer'
  }
];

export const usersPassword = '$2a$10$5.RS0Y/b36tS96KncWC73ekwvoWzuBb3FUEsbEkBEolgAJpBf.jom';