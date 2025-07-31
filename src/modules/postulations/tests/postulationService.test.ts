
import {
  postPostulationService,
  getAllPostulationsService,
  getPostulationByIdService,
  updatePostulationService,
  deletePostulationService,
} from '../postulationService';
import db from '../../../db';
import { NotFoundError, DatabaseError } from '../../../utils/errors';

// Mocking dependencies
jest.mock('../../../db', () => ({
  models: {
    User: {
      findByPk: jest.fn(),
    },
    Postulations: {
      create: jest.fn(),
      findAndCountAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
  },
}));

const { User, Postulations } = db.models;

describe('Postulation Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('postPostulationService', () => {
    it('should create a postulation if user exists', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({ id: '1' });
      (Postulations.create as jest.Mock).mockResolvedValue({ id: '1', company: 'Test' });

      const postulation = await postPostulationService({} as any);

      expect(User.findByPk).toHaveBeenCalled();
      expect(Postulations.create).toHaveBeenCalled();
      expect(postulation).toEqual({ id: '1', company: 'Test' });
    });

    it('should throw NotFoundError if user does not exist', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(postPostulationService({} as any)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getAllPostulationsService', () => {
    it('should return paginated postulations', async () => {
      (Postulations.findAndCountAll as jest.Mock).mockResolvedValue({ count: 1, rows: [{ id: '1' }] });

      const result = await getAllPostulationsService('1', {}, { page: 1, limit: 10 });

      expect(Postulations.findAndCountAll).toHaveBeenCalled();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getPostulationByIdService', () => {
    it('should return a postulation if it exists', async () => {
      (Postulations.findByPk as jest.Mock).mockResolvedValue({ id: '1' });

      const postulation = await getPostulationByIdService('1');

      expect(Postulations.findByPk).toHaveBeenCalledWith('1');
      expect(postulation).toEqual({ id: '1' });
    });

    it('should throw NotFoundError if postulation does not exist', async () => {
      (Postulations.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getPostulationByIdService('1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updatePostulationService', () => {
    it('should update a postulation if it exists', async () => {
      const mockPostulation = { update: jest.fn() };
      (Postulations.findByPk as jest.Mock).mockResolvedValue(mockPostulation);

      await updatePostulationService('1', { company: 'Updated' });

      expect(Postulations.findByPk).toHaveBeenCalledWith('1');
      expect(mockPostulation.update).toHaveBeenCalledWith({ company: 'Updated' });
    });

    it('should throw NotFoundError if postulation does not exist', async () => {
      (Postulations.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(updatePostulationService('1', {})).rejects.toThrow(NotFoundError);
    });
  });

  describe('deletePostulationService', () => {
    it('should delete a postulation if it exists', async () => {
      (Postulations.destroy as jest.Mock).mockResolvedValue(1);

      const result = await deletePostulationService('1');

      expect(Postulations.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual({ message: 'Postulation deleted succesfuly' });
    });

    it('should throw NotFoundError if postulation does not exist', async () => {
      (Postulations.destroy as jest.Mock).mockResolvedValue(0);

      await expect(deletePostulationService('1')).rejects.toThrow(NotFoundError);
    });
  });
});
