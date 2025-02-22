import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Define interfaces for different types of database rows
interface TimeRow {
  now: string;
}

interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserBasicRow {
  id: number;
  username: string;
  email: string;
}

interface CourseRow {
  id: number;
  title: string;
  description: string;
}

// Create a mock pool for development/testing
const pool = {
  query: async (text: string, params?: any[]): Promise<{ rows: any[] }> => {
    // Mock for SELECT NOW()
    if (text === 'SELECT NOW()') {
      return { rows: [{ now: new Date().toISOString() }] };
    }
    // Mock for checking user
    if (text.includes('SELECT * FROM users WHERE')) {
      return { rows: [{
        id: 1,
        username: 'test_user',
        email: 'test@example.com',
        password: 'hashed_password'
      }] };
    }
    // Mock for creating user
    if (text.includes('INSERT INTO users')) {
      const [username, email] = params || [];
      return { 
        rows: [{ 
          id: 1, 
          username, 
          email,
          password: 'mocked_password'
        }]
      };
    }
    // Mock for getting user data
    if (text.includes('SELECT id, username, email FROM users')) {
      return { 
        rows: [{ 
          id: 1, 
          username: 'test_user', 
          email: 'test@example.com'
        }]
      };
    }
    // Mock for getting course
    if (text.includes('SELECT * FROM courses')) {
      return { 
        rows: [{ 
          id: 1, 
          title: 'Test Course', 
          description: 'Test Description' 
        }]
      };
    }
    // Default response
    return { rows: [] };
  }
};

export default pool;