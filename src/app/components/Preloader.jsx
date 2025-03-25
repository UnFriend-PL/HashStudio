'use client';

import React from 'react';
import '@/app/styles/Preloader.scss';

export default function Preloader() {
    return (
        <div className="preloader">
            <div className="logo">
                <div className="circle">
                    <div className="pointer"></div>
                    <div className="square"></div>
                    <div className="circleSquare"></div>
                </div>
            </div>
        </div>
    );
}
