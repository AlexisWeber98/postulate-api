import { validationPostPostulation } from '../validaton.js';

describe('validationPostPostulation', () => {
  it('should return an error message if userId is missing', () => {
    const result = validationPostPostulation('2025-08-08', 'Developer', 'TechCorp', '');
    expect(result).toEqual({ message: 'userId is required' });
  });

  it('should return an error message if aplicationDate is missing', () => {
    const result = validationPostPostulation('', 'Developer', 'TechCorp', '123');
    expect(result).toEqual({ message: 'date is required' });
  });

  it('should return an error message if position is missing', () => {
    const result = validationPostPostulation('2025-08-08', '', 'TechCorp', '123');
    expect(result).toEqual({ message: 'position is required' });
  });

  it('should return an error message if company is missing', () => {
    const result = validationPostPostulation('2025-08-08', 'Developer', '', '123');
    expect(result).toEqual({ message: 'company is required' });
  });

  it('should return null if all parameters are provided', () => {
    const result = validationPostPostulation('2025-08-08', 'Developer', 'TechCorp', '123');
    expect(result).toBeNull();
  });
});
