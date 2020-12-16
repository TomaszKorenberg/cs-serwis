import { useState } from 'react';

const useDebounce = () => {
    const [typingTimeout, setTypingTimeout] = useState();
    return (action, waitTime = 1000) => {
        clearTimeout(typingTimeout);
        const timeout = setTimeout(() => action(), waitTime);
        setTypingTimeout(timeout);
    };
};

export default useDebounce;
