import { useCallback, useEffect, useRef, useState } from 'react';
import { dockingService } from '../services/api';

const POLL_INTERVAL_MS = 3000;

export const useDocking = () => {
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollTimerRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const fetchStatus = useCallback(async (currentTaskId) => {
    const response = await dockingService.getDockingStatus(currentTaskId);
    const data = response.data;

    setResult(data);
    setStatus(data.status || 'processing');

    if (data.status === 'completed' || data.status === 'failed') {
      stopPolling();
      if (data.status === 'failed') {
        setError(data.error || 'Docking failed');
      }
    }

    return data;
  }, [stopPolling]);

  const startDocking = useCallback(async ({ smiles, target }) => {
    stopPolling();
    setError('');
    setResult(null);
    setStatus('queued');
    setIsSubmitting(true);

    try {
      const startResponse = await dockingService.startDocking(smiles, target);
      const data = startResponse.data;

      setTaskId(data.task_id);
      setStatus(data.status || 'queued');

      await fetchStatus(data.task_id);

      pollTimerRef.current = setInterval(() => {
        fetchStatus(data.task_id).catch((err) => {
          stopPolling();
          const message = err?.response?.data?.detail || err?.message || 'Polling failed';
          setError(message);
          setStatus('failed');
        });
      }, POLL_INTERVAL_MS);
    } catch (err) {
      const message = err?.response?.data?.detail || err?.message || 'Failed to start docking';
      setError(message);
      setStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchStatus, stopPolling]);

  useEffect(() => () => stopPolling(), [stopPolling]);

  return {
    taskId,
    status,
    result,
    error,
    isSubmitting,
    isProcessing: status === 'queued' || status === 'processing',
    startDocking,
    stopPolling,
  };
};

export default useDocking;
