import React, { useEffect } from 'react';

const PlayPauseIcon = (props) => {

  const handlePlayPause = (videoRef, e) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    
    e?.stopPropagation();
};

  useEffect(() => {
    if (props.triggerPlayPause) {
      handlePlayPause(props.videoRef)
      props.setTriggerPlayPause(false);
    }
  }, [props]);

  return (
    <>
      {(props.showIcon || props.triggerPlayPause) &&
        <div onClick={(e) => handlePlayPause(props.videoRef, e)}>
            {"|> Play/Pause ||"}
        </div>
      }
    </>
  );
};

export default PlayPauseIcon;