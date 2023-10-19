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
  };

  return (
    <div className="video-player">
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
        />
    </div>
  );
};

export default SimpleVideoPlayer;