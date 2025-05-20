// Unit tests for the useApi hook
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useApi } from '../hooks';
import { DrugForgeProvider } from '../context/DrugForgeContext.jsx';

// Mock axios
jest.mock('axios');

// Mock the DrugForgeContext
jest.mock('../context/DrugForgeContext', () => {
  const originalModule = jest.requireActual('../context/DrugForgeContext');
  
  return {
    ...originalModule,
    useDrugForge: () => ({
      setLoading: jest.fn(),
      setError: jest.fn(),
      addNotification: jest.fn(),
    }),
  };
});

describe('useApi hook', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should make a POST request successfully', async () => {
    // Setup
    const responseData = { success: true, data: 'test data' };
    axios.post.mockResolvedValue({ data: responseData });

    // Render the hook
    const { result } = renderHook(() => useApi());

    // Act - call the post method
    let returnedData;
    await act(async () => {
      returnedData = await result.current.post('/test-endpoint', { key: 'value' });
    });

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/test-endpoint'), 
      { key: 'value' }
    );
    expect(returnedData).toEqual(responseData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(responseData);
  });

  it('should handle POST request error', async () => {
    // Setup
    const errorMessage = 'API error';
    axios.post.mockRejectedValue({ 
      response: { data: { error: errorMessage } } 
    });

    // Render the hook
    const { result } = renderHook(() => useApi());

    // Act - call the post method and catch the error
    let error;
    await act(async () => {
      try {
        await result.current.post('/test-endpoint', { key: 'value' });
      } catch (err) {
        error = err;
      }
    });

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/test-endpoint'), 
      { key: 'value' }
    );
    expect(error).toBeDefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should make a GET request successfully', async () => {
    // Setup
    const responseData = { success: true, data: 'test data' };
    axios.get.mockResolvedValue({ data: responseData });

    // Render the hook
    const { result } = renderHook(() => useApi());

    // Act - call the get method
    let returnedData;
    await act(async () => {
      returnedData = await result.current.get('/test-endpoint', { param: 'value' });
    });

    // Assert
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/test-endpoint'), 
      { params: { param: 'value' } }
    );
    expect(returnedData).toEqual(responseData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(responseData);
  });

  it('should reset data when resetData is called', async () => {
    // Setup
    const responseData = { success: true, data: 'test data' };
    axios.get.mockResolvedValue({ data: responseData });

    // Render the hook
    const { result } = renderHook(() => useApi());

    // Act - call the get method to set data
    await act(async () => {
      await result.current.get('/test-endpoint');
    });

    // Verify data is set
    expect(result.current.data).toEqual(responseData);

    // Act - reset the data
    act(() => {
      result.current.resetData();
    });

    // Assert that data is reset
    expect(result.current.data).toBe(null);
  });

  it('should reset error when resetError is called', async () => {
    // Setup
    const errorMessage = 'API error';
    axios.get.mockRejectedValue({ 
      response: { data: { error: errorMessage } } 
    });

    // Render the hook
    const { result } = renderHook(() => useApi());

    // Act - call the get method to trigger error
    await act(async () => {
      try {
        await result.current.get('/test-endpoint');
      } catch (err) {
        // Expected error
      }
    });

    // Verify error is set
    expect(result.current.error).toBe(errorMessage);

    // Act - reset the error
    act(() => {
      result.current.resetError();
    });

    // Assert that error is reset
    expect(result.current.error).toBe(null);
  });
});
