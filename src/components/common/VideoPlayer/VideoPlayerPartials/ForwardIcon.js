import React, { useEffect } from 'react';
import SvgIcon from './SvgIcon';
import FastForwardIcon from './../../../../assets/images/rewind-forward-svgrepo-com.svg';

const ForwardIcon = (props) => {

    const handleForward = (videoRef, e = null) => {
        videoRef.current.currentTime += 10;
        e?.stopPropagation();
    }

  useEffect(() => {
    if (props.triggerForward) {
        handleForward(props.videoRef);
        props.setTriggerForward(false);
    }
  }, [props]);

  return (
    <>
      {(props.showIcon || props.triggerForward) &&
        <div onClick={(e) => handleForward(props.videoRef, e)}>
            <SvgIcon 
              svgPath={FastForwardIcon} 
              svgName="Fast Forward" 
            />
        </div>
      }
    </>
  );
};

export default ForwardIcon;