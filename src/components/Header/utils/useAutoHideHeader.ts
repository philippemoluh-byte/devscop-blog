import { useEffect, useRef, useState } from "react";

const DESKTOP_MIN_WIDTH = 1025;
const SCROLL_HIDE_THRESHOLD = 80;

/**
 * Hides the header when scrolling down past SCROLL_HIDE_THRESHOLD, shows it
 * again when scrolling up. Disabled below DESKTOP_MIN_WIDTH so the mobile
 * header always stays visible.
 */
export function useAutoHideHeader(): boolean {
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < DESKTOP_MIN_WIDTH) return;

            const currentScroll = window.scrollY;
            const scrolledDownPastThreshold =
                currentScroll > lastScrollY.current &&
                currentScroll > SCROLL_HIDE_THRESHOLD;

            setHidden(scrolledDownPastThreshold);
            lastScrollY.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return hidden;
}
