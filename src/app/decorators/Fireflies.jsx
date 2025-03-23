"use client";

import React, { useEffect, useState } from "react";
import styles from "./Fireflies.module.scss";
// If you're NOT using a .module.scss file, remove `styles` and use regular class names

export default function Fireflies({ count = 20 }) {
    const [fireflies, setFireflies] = useState([]);

    useEffect(() => {
        // Runs only on client (after SSR), so no hydration mismatch
        const generated = Array.from({ length: count }).map(() => {
            return {
                size: Math.random() * 5 + 2, // e.g. 2-7px
                left: Math.random() * 100,   // 0-100%
                top: Math.random() * 100,    // 0-100%
                delay: Math.random() * 5,    // 0-5s
            };
        });
        setFireflies(generated);
    }, [count]);

    // Optional: If still generating, show nothing or a loading fallback
    if (!fireflies.length) {
        return <div className={styles.firefliesContainer} />;
    }

    return (
        <div className={styles.firefliesContainer}>
            {fireflies.map((f, i) => (
                <span
                    key={i}
                    className={styles.firefly}
                    style={{
                        width: `${f.size}px`,
                        height: `${f.size}px`,
                        left: `${f.left}%`,
                        top: `${f.top}%`,
                        animationDelay: `${f.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
