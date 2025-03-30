"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/Fireflies.module.scss";

export default function Fireflies({ count = 20 }) {
    const [fireflies, setFireflies] = useState([]);

    useEffect(() => {
        const generated = Array.from({ length: count }).map(() => {
            return {
                size: Math.random() * 5 + 2,
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 5,
            };
        });
        setFireflies(generated);
    }, [count]);

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
