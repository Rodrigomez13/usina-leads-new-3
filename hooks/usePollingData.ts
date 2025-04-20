// hooks/usePollingData.ts
import { useState, useEffect } from 'react';

export function usePollingData<T>(
  fetchFn: () => Promise<T>,
  interval: number = 5000 // 5 segundos por defecto
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setLoading(false);
      }
    };

    // Primera carga
    fetchData();

    // Configurar el intervalo de actualización
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchFn, interval]);

  return { data, loading, error };
}