import React, { useState, useRef, useEffect } from "react";
import PlaceholderImage from "./PlaceholderImage";

const LazyImage = ({ src, alt, className, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Create IntersectionObserver to detect when the image enters the viewport
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Image is in view, set isVisible to true
                        setIsVisible(true);
                        // Stop observing once loaded
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: "100px", //Load image 100px before it enters viewport
                threshold: 0.1, // Trigger when 10% of the image is visible
            }
        );

        // Start observing the image element
        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <div className="lazy-image-wrapper">
            <img
                ref={imgRef}
                src={isVisible ? src : null}
                alt={alt}
                className={className}
                {...props}
                onLoad={() => setIsLoaded(true)}
                style={{
                    transition: "opacity 0.3s ease-in",
                    opacity: isVisible ? 1 : 0.5,
                    ...props.style,
                }}
            />
            {!isLoaded ? <PlaceholderImage /> : null}
        </div>
    );
};

export default LazyImage;
