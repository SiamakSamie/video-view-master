import React, { useState } from 'react';
import ForwardIcon from './ForwardIcon';
import PlayPauseIcon from './PlayPauseIcon';
import ReverseIcon from './ReverseIcon';

const ViewMasterOverlay = (props) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [triggerPlayPause, setTriggerPlayPause] = useState(false);
    const [triggerReverse, setTriggerReverse] = useState(false);
    const [triggerForward, setTriggerForward] = useState(false);

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * props.videoRef.current.duration;
        props.videoRef.current.currentTime = seekTime;
        props.setProgress(e.target.value);
    };

    const handleFullScreen = () => {
      console.log("FullScreen video");
        if (props.videoRef.current.requestFullscreen) {
            props.videoRef.current.requestFullscreen();
        } else if (props.videoRef.current.mozRequestFullScreen) {
            props.videoRef.current.mozRequestFullScreen();
        } else if (props.videoRef.current.webkitRequestFullscreen) {
            props.videoRef.current.webkitRequestFullscreen();
        }
    };

    const handleClicks = (e) => {
        if (props.progress === 0) {
            setTriggerPlayPause(true);
        } else {
            switch (e.detail) {
                case 1:
                  console.log("click");
                  handleVideoClick(e);
                  break;
                case 2:
                  console.log("double click");
                  handleDoubleClick(e);
                  break;
                case 3:
                  console.log("triple click");
                  handleDoubleClick(e);
                  break;
                default:
                  console.log("click");
                  handleVideoClick(e);
              }
        }
    }

    const handleDoubleClick = (e) => {
      console.log("Doubleclick video");
      const { offsetX, target } = e.nativeEvent;
      const width = target.offsetWidth;
  
      // Calculate the click position as a percentage of the video width
      const clickPercentage = (offsetX / width) * 100;
  
      // If the click is on the left half, rewind by 10 seconds
      if (clickPercentage < 40) {
        setTriggerReverse(true);
      }
      // If the click is on the right half, fast forward by 10 seconds
      else if (clickPercentage > 60) {
        setTriggerForward(true);
      }
      else {
        handleFullScreen();
      }
    }

    const handleVideoClick = (e) => {
      console.log("Click video");
      const { offsetX, offsetY, target } = e.nativeEvent;
      const width = target.offsetWidth;
      const height = target.offsetHeight;
  
      // Calculate the click position as a percentage of the video width
      const clickPercentageX = (offsetX / width) * 100;
      const clickPercentageY = (offsetY / height) * 100;
  
      // Toggle play/pause only if clicked around the center (10% margin)
      if (clickPercentageX >= 40 && clickPercentageX <= 60 && clickPercentageY >= 40 && clickPercentageY <= 60 ) {
        setTriggerPlayPause(true);
      } else {
        setShowOverlay(!showOverlay);
      }
    }

  return (
    <div className="overlay active"  
        onClick={handleClicks}
    >
        <div className="overlay-icons">
            <div className="overlay-icon">
            <ReverseIcon
                videoRef={props.videoRef}
                showIcon={showOverlay}
                triggerReverse={triggerReverse}
                setTriggerReverse={setTriggerReverse}
            />
            </div>
            
            <div className="overlay-icon">
            <PlayPauseIcon 
                videoRef={props.videoRef}
                showIcon={showOverlay}
                triggerPlayPause={triggerPlayPause}
                setTriggerPlayPause={setTriggerPlayPause}
            />
            </div>
            
            <div className="overlay-icon">
            <ForwardIcon 
                videoRef={props.videoRef}
                showIcon={showOverlay}
                triggerForward={triggerForward}
                setTriggerForward={setTriggerForward}
            />
            </div>
        </div>
        
        {showOverlay &&
            <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={props.progress}
                onChange={handleSeek}
            />
        }
    </div>
  );
};

export default ViewMasterOverlay;