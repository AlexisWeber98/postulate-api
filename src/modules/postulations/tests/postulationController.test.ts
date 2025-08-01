
import { Request, Response } from 'express';
import {
  postPostulationController,
  getAllPostulationsController,
  getPostulationByIdController,
  updatePostulationController,
  deletePostulationController,
} from '../postulationController';
import * as postulationService from '../postulationService';
import serverResponse from '../../../utils/response';
import { ValidationError } from '../../../utils/errors';

// Mocking dependencies
jest.mock('../postulationService');
jest.mock('../../../utils/response');

const mockRequest = (body: any, params: any = {}, query: any = {}) => ({
  body,
  params,
  query,
}) as unknown as Request;

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Postulation Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('postPostulationController', () => {
    it('should create a postulation and return 200', async () => {
      const req = mockRequest({ applicationDate: '2024-01-01', position: 'Developer', company: 'Test', userId: '1' });
      const res = mockResponse();
      (postulationService.postPostulationService as jest.Mock).mockResolvedValue({ id: '1' });

      await postPostulationController(req, res, jest.fn());

      expect(postulationService.postPostulationService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith('Ok', { postulation: { id: '1' } });
    });

    it('should return 400 for invalid data', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await postPostulationController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'error' }));
    });
  });

  describe('getAllPostulationsController', () => {
    it('should get all postulations and return 200', async () => {
      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();
      (postulationService.getAllPostulationsService as jest.Mock).mockResolvedValue({ data: [], total: 0 });

      await getAllPostulationsController(req, res, jest.fn());

      expect(postulationService.getAllPostulationsService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith('Ok', { data: [], total: 0 });
    });

    it('should return 400 if userId is not provided', async () => {
      const req = mockRequest({}, {});
      const res = mockResponse();

      await getAllPostulationsController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'error' }));
    });
  });

  describe('getPostulationByIdController', () => {
    it('should get a postulation by id and return 200', async () => {
      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();
      (postulationService.getPostulationByIdService as jest.Mock).mockResolvedValue({ id: '1' });

      await getPostulationByIdController(req, res, jest.fn());

      expect(postulationService.getPostulationByIdService).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith('Ok', { postulation: { id: '1' } });
    });

    it('should return 400 if postulationId is not provided', async () => {
      const req = mockRequest({}, {});
      const res = mockResponse();

      await getPostulationByIdController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'error' }));
    });
  });

  describe('updatePostulationController', () => {
    it('should update a postulation and return 200', async () => {
      const req = mockRequest({ postulationId: '1', data: { company: 'Updated' } });
      const res = mockResponse();
      (postulationService.updatePostulationService as jest.Mock).mockResolvedValue({ id: '1' });

      await updatePostulationController(req, res, jest.fn());

      expect(postulationService.updatePostulationService).toHaveBeenCalledWith('1', { company: 'Updated' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith('Ok', { postulation: { id: '1' } });
    });

    it('should return 400 if data or postulationId are not provided', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await updatePostulationController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'error' }));
    });
  });

  describe('deletePostulationController', () => {
    it('should delete a postulation and return 200', async () => {
      const req = mockRequest({ id: '1' });
      const res = mockResponse();
      (postulationService.deletePostulationService as jest.Mock).mockResolvedValue({ message: 'deleted' });

      await deletePostulationController(req, res, jest.fn());

      expect(postulationService.deletePostulationService).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith('Ok', { postulation: { message: 'deleted' } });
    });

    it('should return 400 if id is not provided', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await deletePostulationController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'error' }));
    });
  });
});
