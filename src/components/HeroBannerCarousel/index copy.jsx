import React, { useState, useMemo, useEffect, useRef } from "react";
import "./index.css";
import { Carousel, Modal } from "antd";
import YoutubeVideo from "../YoutubeVideo";

const HeroBannerCarousel = ({ banners }) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const playerRef = useRef(null);

    // console.log("banners carousel: ", banners);

    // Load YouTube IFrame API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, []);

    const handleClickTrailer = (item) => {
        // console.log("CLICK: ", item);
        setOpen(true);
        setLoading(true);
        setSelectedTrailer(item.url);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    // Handle modal close and pause video
    const handleModalClose = () => {
        if (
            playerRef.current &&
            typeof playerRef.current.pauseVideo === "function"
        ) {
            playerRef.current.pauseVideo();
        }
        setOpen(false);
        setSelectedTrailer(null); // Reset video
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

    const carouselList = useMemo(() => {
        // console.log("useMemo");
        return banners.map((item, i) => (
            <div key={i} className="hero-carousel-list">
                <div
                    className="hero-carousel-list-bg"
                    style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div
                    className="hero-carousel-list-bg-m"
                    style={{ backgroundImage: `url(${item.imgM})` }}
                ></div>
                <div className="hero-carousel-list-inner">
                    <div className="hero-carousel-list-content">
                        <button
                            onClick={() => {
                                handleClickTrailer(item);
                            }}
                        >
                            <i></i>
                            <span>Watch Trailer</span>
                        </button>
                    </div>
                </div>
            </div>
        ));
    }, [banners]); // Dependency: only recalculate if banners changes

    // console.log("selectedTrailer: ", selectedTrailer);

    const myVideoId = "1pHDWnXmK7Y";

    return (
        <>
            <Carousel
                draggable={true}
                autoplay={{
                    dotDuration: true,
                }}
                autoplaySpeed={5000}
            >
                {carouselList}
            </Carousel>
            <Modal
                title={<></>}
                footer={<></>}
                loading={loading}
                open={open}
                onCancel={handleModalClose}
                wrapClassName="trailer-modal"
            >
                <iframe
                    id="youtube-iframe"
                    width="560"
                    height="315"
                    src={`${selectedTrailer}?enablejsapi=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="trailer-video-modal"
                    onLoad={handleIframeLoad}
                ></iframe>

                {/* <YoutubeVideo videoId={myVideoId} /> */}

                {/* <iframe
                    width="560"
                    height="315"
                    src="/youtube-embed/1pHDWnXmK7Y?enablejsapi=1&version=3&playerapiid=ytplayer&mute=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="trailer-video-modal"
                    onLoad={handleIframeLoad} // Initialize player on load
                ></iframe> */}
            </Modal>
        </>
    );
};

export default HeroBannerCarousel;
