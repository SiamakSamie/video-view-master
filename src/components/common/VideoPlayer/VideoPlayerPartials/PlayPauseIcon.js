import React, { useEffect } from 'react';
import SvgIcon from './SvgIcon';
import PlayIcon from './../../../../assets/images/play-svgrepo-com.svg';
import PauseIcon from './../../../../assets/images/pause-svgrepo-com.svg';

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
          { props.videoRef.current.paused ?
            <SvgIcon 
              svgPath={PlayIcon} 
              svgName="Play" 
            />
          :
          <SvgIcon 
            svgPath={PauseIcon} 
            svgName="Pause" 
          />
          }
        </div>
      }
    </>
  );
};

export default PlayPauseIcon;