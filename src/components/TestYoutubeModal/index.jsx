import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "antd";
import "./index.css";

const TestYoutubeModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const playerRef = useRef(null);

    // Load YouTube IFrame API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);

    // Video data
    const videos = [
        {
            id: 1,
            title: "Video 1",
            url: "https://www.youtube.com/embed/1pHDWnXmK7Y",
        },
        {
            id: 2,
            title: "Video 2",
            url: "https://www.youtube.com/embed/Qr_kX0D3DNA",
        },
        {
            id: 3,
            title: "Video 3",
            url: "https://www.youtube.com/embed/xAdUdi1JJ4w",
        },
    ];

    // Open modal with selected video
    const handleOpenModal = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setModalOpen(true);
    };

    // Close modal and pause video
    const handleCloseModal = () => {
        if (
            playerRef.current &&
            typeof playerRef.current.pauseVideo === "function"
        ) {
            playerRef.current.pauseVideo();
        }
        setModalOpen(false);
        setSelectedVideo(null); // Reset video
    };

    // Initialize YouTube player when iframe loads
    const handleIframeLoad = () => {
        if (window.YT && window.YT.Player) {
            playerRef.current = new window.YT.Player("youtube-iframe", {
                events: {
                    onReady: (event) => {
                        console.log("Player ready");
                    },
                },
            });
        }
    };

    return (
        <div className="app-container">
            <h1>YouTube Video Modals</h1>
            <div className="button-group">
                {videos.map((video) => (
                    <Button
                        key={video.id}
                        type="primary"
                        onClick={() => handleOpenModal(video.url)}
                    >
                        {video.title}
                    </Button>
                ))}
            </div>

            <Modal
                title={null}
                footer={null}
                open={modalOpen}
                onCancel={handleCloseModal}
                width={600}
                centered
                bodyStyle={{ padding: 0 }}
            >
                {selectedVideo && (
                    <iframe
                        id="youtube-iframe"
                        width="100%"
                        height="315"
                        src={`${selectedVideo}?enablejsapi=1`}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                    />
                )}
            </Modal>
        </div>
    );
};

export default TestYoutubeModal;
