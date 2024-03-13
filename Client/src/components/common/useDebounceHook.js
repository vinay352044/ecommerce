import { useEffect, useState } from 'react';

const useDebounceHook = (value,delay) => {  // query , 500
    const [debouncedValue, setDebouncedValue] = useState(value); // query

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);  // query
        },delay);// 500 msec

        return () => {
            clearTimeout(handler); // for clearing timeouts
        };
    }, [value,delay]);  // whenever value as well as delay changes

    return debouncedValue;  // query returned 
};

export default useDebounceHook;
