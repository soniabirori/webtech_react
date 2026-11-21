import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/formValidation';
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from '../data/demoAdmin';

const STORAGE_KEY = 'scent_stories_account';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Could not read the saved Scent Stories account.', error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Could not save the Scent Stories account in this browser.', error);
    }
  }, [user]);

  function login(email, password) {
    const normalizedEmail = email.trim();
    if (!isValidEmail(normalizedEmail)) {
      throw new Error('Enter a complete email address, like name@example.com.');
    }
    if (!password?.trim()) {
      throw new Error('Enter your password to continue.');
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }
    if (normalizedEmail.toLowerCase() === DEMO_ADMIN_EMAIL) {
      throw new Error('Use the separate admin sign-in for this account.');
    }

    const savedUser = readStoredUser();
    const firstName = normalizedEmail.split('@')[0].split(/[._-]/)[0];
    const nextUser = {
      ...(savedUser || {}),
      firstName: firstName ? `${firstName[0].toUpperCase()}${firstName.slice(1)}` : 'Scent lover',
      email: normalizedEmail,
      joined: savedUser?.joined || new Date().getFullYear(),
      role: 'user',
    };
    setUser(nextUser);
    return nextUser;
  }

  function adminLogin(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) {
      throw new Error('The admin email or password is incorrect.');
    }
    const nextUser = {
      firstName: 'Scent',
      lastName: 'Admin',
      email: DEMO_ADMIN_EMAIL,
      joined: new Date().getFullYear(),
      role: 'admin',
    };
    setUser(nextUser);
    return nextUser;
  }

  function register({ firstName, lastName, email, password }) {
    if (!firstName?.trim() || !lastName?.trim()) {
      throw new Error('Enter your first and last name.');
    }
    if (!isValidEmail(email?.trim() || '')) {
      throw new Error('Enter a complete email address, like name@example.com.');
    }
    if (!password?.trim()) {
      throw new Error('Enter a password to create your account.');
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }
    if (email.trim().toLowerCase() === DEMO_ADMIN_EMAIL) {
      throw new Error('That email is reserved for the admin demo account.');
    }
    const nextUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      joined: new Date().getFullYear(),
      role: 'user',
    };
    setUser(nextUser);
    return nextUser;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, adminLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
