import React, { useRef, useState } from 'react';

const SimpleVideoPlayer = () => {
    const testVideoSource = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [showOverlay, setShowOverlay] = useState(false);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleProgress = () => {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        const calculatedProgress = (currentTime / duration) * 100;
        setProgress(calculatedProgress);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTime;
        setProgress(e.target.value);
    };

    const handleFullScreen = () => {
      console.log("FullScreen video");
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        }
    };

    const handleDoubleClick = (e) => {
      const { offsetX, target } = e.nativeEvent;
      const width = target.offsetWidth;
  
      // Calculate the click position as a percentage of the video width
      const clickPercentage = (offsetX / width) * 100;
  
      // If the click is on the left half, rewind by 10 seconds
      if (clickPercentage < 45) {
        videoRef.current.currentTime -= 10;
      }
      // If the click is on the right half, fast forward by 10 seconds
      else if (clickPercentage > 55) {
        videoRef.current.currentTime += 10;
      }
      else {
        handleFullScreen();
      }
    };

    const handleVideoClick = (e) => {
      const { offsetX, target } = e.nativeEvent;
      const width = target.offsetWidth;
  
      // Calculate the click position as a percentage of the video width
      const clickPercentage = (offsetX / width) * 100;
  
      // Toggle play/pause only if clicked around the center (10% margin)
      if (clickPercentage >= 45 && clickPercentage <= 55) {
        handlePlayPause();
      } else {
        setShowOverlay(!showOverlay);
      }
    }
    
    const handleOverlayClick = (event, action) => {
      if (action) {
        if (action === 'rewind') {
          videoRef.current.currentTime -= 10;
        } else if (action === 'fastForward') {
          videoRef.current.currentTime += 10;
        } else {
          handlePlayPause();
        }
        event.stopPropagation();
      }
    };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        controls={false}
        onTimeUpdate={handleProgress}
        onClick={handleVideoClick}
        onDoubleClick={handleDoubleClick}
        disablePictureInPicture  
      >
        <source
          src={testVideoSource}
          type="video/mp4"
        />
        {/* Add top layer layouting here */}
        Your browser does not support the video tag.
      </video>

        <div className={`overlay ${showOverlay ? 'active' : ''}`}  
            onClick={handleVideoClick}
        >
          <div className="overlay-icons">
            <div
              className="overlay-icon"
              onClick={(e) => handleOverlayClick(e, 'rewind')}
            >
              {"<< Rewind"}
            </div>

            <div
              className="overlay-icon"
              onClick={(e) => handleOverlayClick(e, 'play/pause')}
            >
              {"|> Play/Pause ||"}
            </div>

            <div
              className="overlay-icon"
              onClick={(e) => handleOverlayClick(e, 'fastForward')}
            >
              {"Fast Forward >>"}
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={handleSeek}
          />
        </div>
    </div>
  );
};

export default SimpleVideoPlayer;