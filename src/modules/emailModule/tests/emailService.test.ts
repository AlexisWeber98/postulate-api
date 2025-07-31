
import { whiteListService } from '../emailService';
import db from '../../../db';

// Mocking dependencies
jest.mock('../../../db', () => ({
  models: {
    WhiteList: {
      create: jest.fn(),
    },
  },
}));

const { WhiteList } = db.models;

describe('Email Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('whiteListService', () => {
    it('should add an email to the whitelist', async () => {
      (WhiteList.create as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

      const result = await whiteListService('test@example.com');

      expect(WhiteList.create).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(result).toEqual({ email: 'test@example.com' });
    });
  });
});
