import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
} from "react";

const YoutubeVideo = ({ videoId }, ref) => {
    const playerRef = useRef(null);
    const [player, setPlayer] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Load the Iframe Player API if it hasn't been loaded yet. Check if YT is defined
        if (window.YT === undefined) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // Expose the global YT object to window
            window.onYouTubeIframeAPIReady = () => {
                setIsReady(true);
            };
        } else {
            setIsReady(true); // YT alreadyy defined
        }
    }, []);

    useEffect(() => {
        if (isReady && player === null && playerRef.current) {
            const newPlayer = new window.YT.Player(playerRef.current, {
                height: "390",
                width: "640",
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange, //Optional: For stage change events
                },
            });
            setPlayer(newPlayer);
        }

        // Cleanup function
        return () => {
            if (player) {
                player.destroy(); // Destroy the player instance
            }
        };
    }, [isReady, videoId, player]);

    const onPlayerReady = (e) => {
        // You can access the player instance here: e.target
        // For example, you can auto-play: e.target.playVideo()
        // console.log("Player is ready!", e);
    };

    const onPlayerStateChange = (e) => {
        // event.data will contain the player's state (e.g., YT.PlayerState.PLAYING)
        // console.log("Player state changed:", e.data);
    };

    useImperativeHandle(ref, () => ({
        pauseVideo: () => {
            if (player) {
                player.pauseVideo();
            }
        },

        playVideo: () => {
            if (player) {
                player.playVideo();
            }
        },
    }));

    return (
        <div>
            <div ref={playerRef} className="trailer-video-modal"></div>
            {/* <button onClick={pauseVideo}>Pause</button>
            <button onClick={playVideo}>Play</button> */}
        </div>
    );
};

export default React.forwardRef(YoutubeVideo);
