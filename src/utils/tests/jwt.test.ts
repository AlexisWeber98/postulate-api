
import { generateToken, verifyToken } from '../jwt';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('JWT Utilities', () => {
  const mockUser = {
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
    lastName: 'Test',
    userName: 'testuser',
    password: 'hashedPassword',
  };
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  const JWT_EXPIRES_IN = '30d';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    it('should generate a token with correct payload and secret', () => {
      (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

      const token = generateToken(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email, name: mockUser.name },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );
      expect(token).toBe('mockedToken');
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return payload', () => {
      const mockPayload = { id: '123', email: 'test@example.com' };
      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      const token = 'validToken';
      const payload = verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, JWT_SECRET);
      expect(payload).toEqual(mockPayload);
    });

    it('should throw an error for an invalid token', () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const token = 'invalidToken';

      expect(() => verifyToken(token)).toThrow('Invalid token');
    });
  });
});
