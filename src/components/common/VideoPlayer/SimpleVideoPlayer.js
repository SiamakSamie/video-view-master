import React, { useRef, useState } from 'react';
import ViewMasterOverlay from './VideoPlayerPartials/ViewMasterOverlay';

const SimpleVideoPlayer = () => {
    const testVideoSource = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const handleProgress = () => {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    }

    const toggleFullScreen = async () => {
      const container = document.getElementById('video-player');
      const fullscreenApi = container.requestFullscreen
        || container.webkitRequestFullScreen
        || container.mozRequestFullScreen
        || container.msRequestFullscreen;
      if (!document.fullscreenElement) {
        fullscreenApi.call(container);
      }
      else {
        document.exitFullscreen();
      }
    };

  return (
    <div className="video-player" id="video-player">
      <video
        ref={videoRef}
        controls={false}
        onTimeUpdate={handleProgress}
        disablePictureInPicture  
      >
        <source
          src={testVideoSource}
          type="video/mp4"
        />
        {/* Add top layer layouting here */}
        Your browser does not support the video tag.
      </video>

      <ViewMasterOverlay
        videoRef={videoRef} 
        progress={progress}
        setProgress={setProgress}
        toggleFullScreen={toggleFullScreen}
        />
    </div>
  );
};

export default SimpleVideoPlayer;