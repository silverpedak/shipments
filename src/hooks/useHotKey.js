import { useEffect } from 'react';

const useHotKey = (key, callback) => {
    useEffect(() => {
        const close = (event) => {
            event.key === key && callback();
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    })
}

export default useHotKey;