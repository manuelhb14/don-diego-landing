import { useState, useEffect } from "react";

// This module-level variable persists as long as the React application
// remains loaded in the browser (across client-side navigations).
let hasVisitedInitialSession = false;

export function useHasVisited() {
    const [hasVisited, setHasVisited] = useState(hasVisitedInitialSession);

    useEffect(() => {
        if (!hasVisitedInitialSession) {
            hasVisitedInitialSession = true;
        }
    }, []);

    return hasVisited;
}
