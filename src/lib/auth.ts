import type { z } from 'zod';
import type { loginSchema, signupSchema } from '@/lib/schemas';
import type { User } from '@/lib/types';

const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

// Helper to get users from localStorage
const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: User[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signUp = async (details: z.infer<typeof signupSchema>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const existingUser = users.find(u => u.email === details.email);

      if (existingUser) {
        return reject(new Error("User with this email already exists."));
      }

      const newUser: User = {
        id: new Date().toISOString(),
        email: details.email,
        name: details.name,
      };

      // In a real app, you'd store a hashed password. Here we omit it.
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);

      // Automatically log in the user after signup
      const session = { token: 'mock-token-' + newUser.id, user: newUser };
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      resolve(newUser);
    }, 500);
  });
};

export const logIn = async (credentials: z.infer<typeof loginSchema>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === credentials.email);

      // Check the password
      if (!user) {
        return reject(new Error("Invalid email or password."));
      }

      const session = { token: 'mock-token-' + user.id, user };
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      resolve(user);
    }, 500);
  });
};

export const logOut = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const getSession = (): { token: string; user: User } | null => {
  if (typeof window === 'undefined') return null;
  const sessionJson = localStorage.getItem(SESSION_KEY);
  return sessionJson ? JSON.parse(sessionJson) : null;
};
