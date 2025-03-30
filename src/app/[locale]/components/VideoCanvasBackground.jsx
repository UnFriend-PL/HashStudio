'use client';

import React, { useRef, useEffect } from 'react';

const VideoCanvasBackground = ({ src }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = document.createElement('video');
        const parent = canvas.parentElement;

        video.src = src;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        const handleResize = () => {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        video.addEventListener('canplay', () => video.play());

        const render = () => {
            if (video.readyState >= 2) {
                const videoAspectRatio = video.videoWidth / video.videoHeight;
                const canvasAspectRatio = canvas.width / canvas.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspectRatio > videoAspectRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / videoAspectRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * videoAspectRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
            }
            requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            video.pause();
        };
    }, [src]);

    return <canvas ref={canvasRef} className="video-canvas-bg" />;
};

export default VideoCanvasBackground;