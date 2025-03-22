import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Cursor.scss";

const Cursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const bubbleRef = useRef(null);

    // State for hover modes
    const [isTextMode, setIsTextMode] = useState(false);      // over text content
    const [isClickable, setIsClickable] = useState(false);    // over clickable (no follow text)
    const [bubbleText, setBubbleText] = useState("");         // text to show in bubble (if any)

    // Only render the cursor after we're on the client (Next.js SSR safety)
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted || !cursorRef.current) return;
        const cursorElem = cursorRef.current;
        const dotElem = dotRef.current;
        const bubbleElem = bubbleRef.current;

        // Hide the native cursor
        document.body.style.cursor = "none";

        // Set initial style (hidden until first movement)
        cursorElem.style.opacity = "0";

        // Variables for smooth trailing motion
        let currentX = 0, currentY = 0;
        let targetX = currentX, targetY = currentY;
        let cursorVisible = false;  // track if we've shown the custom cursor yet

        // Utility: check if a point (x,y) lies over a text node's content
        function getTextHeightUnderPoint(x, y) {
            const elem = document.elementFromPoint(x, y);
            if (!elem) return null;
            // Check each text node child of the element
            for (const node of elem.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    if (!text || text.trim() === "") continue;  // skip empty text nodes
                    const range = document.createRange();
                    range.selectNode(node);
                    const rects = range.getClientRects();
                    for (const rect of rects) {
                        if (
                            x >= rect.left && x <= rect.right &&
                            y >= rect.top && y <= rect.bottom
                        ) {
                            // Point is within this text node's rect
                            return rect.bottom - rect.top;  // height of the text line
                        }
                    }
                }
            }
            return null;
        }

        // Animation loop for cursor trailing effect
        const animateCursor = () => {
            // Lerp towards target position for smooth lag
            currentX += (targetX - currentX) * 0.2;
            currentY += (targetY - currentY) * 0.2;
            cursorElem.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Mouse move handler
        const onMouseMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            // Show cursor element after first movement (fade-in)
            if (!cursorVisible) {
                cursorVisible = true;
                cursorElem.style.opacity = "1";
            }

            const elem = document.elementFromPoint(e.clientX, e.clientY);
            if (!elem) return;

            // Determine if hovering a clickable element (or one with follow text)
            const clickableEl = elem.closest('a, button, [role="button"], [data-follow]');
            let newBubbleText = "";
            let newClickable = false;
            if (clickableEl) {
                const tag = clickableEl.tagName.toLowerCase();
                // Exclude text inputs/areas from "clickable" (they'll be handled as text)
                const isTextInput = (tag === "input" && clickableEl.type &&
                        ["text","search","email","url","tel","password","number"].includes(clickableEl.type.toLowerCase()))
                    || tag === "textarea";
                if (!isTextInput) {
                    newClickable = true;
                    // Check for follow text attribute on this clickable element
                    const followAttr = clickableEl.getAttribute("data-follow") || clickableEl.getAttribute("follow");
                    if (followAttr) {
                        newBubbleText = followAttr;
                        newClickable = false; // we'll show bubble instead of enlarging
                    }
                }
            }

            // Determine if hovering actual text content (and not in clickable mode)
            let newTextMode = false;
            let textHeight = null;
            if (!newBubbleText && !newClickable) {
                // If element is contenteditable or a text input/textarea, treat as text region
                const tag = elem.tagName.toLowerCase();
                const isEditableText = elem.isContentEditable || tag === "textarea" ||
                    (tag === "input" && elem.type && ["text","search","email","url","tel","password","number"].includes(elem.type.toLowerCase()));
                if (isEditableText) {
                    newTextMode = true;
                    // Use the element's font size (or bounding box height) for I-beam height
                    const style = window.getComputedStyle(elem);
                    textHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) || elem.getBoundingClientRect().height;
                } else {
                    // Use Range-based detection for static text nodes
                    const detectedHeight = getTextHeightUnderPoint(e.clientX, e.clientY);
                    if (detectedHeight) {
                        newTextMode = true;
                        textHeight = detectedHeight;
                    }
                }
            }

            // Update state for modes if changed
            setBubbleText(newBubbleText);               // text to display in bubble (empty string if none)
            setIsTextMode(newTextMode);
            setIsClickable(newBubbleText ? false : newClickable);  // if showing bubble, do not mark as clickable

            // Update the cursor dot element style for text height if in text mode
            if (newTextMode && textHeight) {
                dotElem.style.height = `${textHeight}px`;
            } else {
                dotElem.style.height = ""; // reset to default via CSS
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        // Clean up on unmount
        return () => {
            document.body.style.cursor = "auto";  // restore default cursor
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [mounted]);

    // Render the cursor elements via portal to body
    if (!mounted) return null;
    return createPortal(
        <div ref={cursorRef} className={`custom-cursor ${isTextMode ? "text-mode" : ""}`}>
            <div ref={dotRef} className={`cursor-dot${isClickable ? " clickable" : ""}${isTextMode ? " text" : ""}`}></div>
            {/* Bubble text element (visible when bubbleText is non-empty) */}
            <div ref={bubbleRef} className={`cursor-bubble${bubbleText ? " visible" : ""}`}>
                {bubbleText}
            </div>
        </div>,
        document.body
    );
};

export default Cursor;
