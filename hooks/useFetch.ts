import { useState, useCallback, useEffect, useRef } from "react";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

type FetchOptions = RequestInit;

const useFetch = <T>(
    url: string,
    options?: FetchOptions
): UseFetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Refs para controlar el comportamiento del fetch
    const abortControllerRef = useRef<AbortController | null>(null);
    const optionsRef = useRef(options);

    // Actualizar optionsRef cuando las opciones cambien
    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const fetchData = useCallback(async () => {
        // Validar que la URL exista
        if (!url) {
            setError("URL no proporcionada");
            return;
        }

        // Cancelar la request anterior si existe
        abortControllerRef.current?.abort();
        
        // Crear un nuevo AbortController para esta request
        abortControllerRef.current = new AbortController();
        
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                ...optionsRef.current,
                signal: abortControllerRef.current.signal
            });
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const jsonData = await response.json() as T;
            setData(jsonData);

        } catch (err) {
            // Ignorar error si fue cancelado intencionalmente
            if (err instanceof Error && err.name === 'AbortError') {
                return;
            }
            
            const errorMessage = err instanceof Error ? err.message : "Error desconocido";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }

    }, [url]);

    // Agregar cleanup para cancelar request si el componente se desmonta
    useEffect(() => {
        fetchData();
        
        return () => {
            abortControllerRef.current?.abort();
        };
    }, [url, fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;