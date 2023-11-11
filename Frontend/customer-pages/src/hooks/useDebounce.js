import { useEffect, useState } from 'react';
function useDebounce(value, delay) {
    const [deboucedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return deboucedValue;
}

export default useDebounce;
