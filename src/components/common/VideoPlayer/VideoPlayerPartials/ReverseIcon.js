import React, { useEffect } from 'react';
import SvgIcon from './SvgIcon';
import RewindBackIcon from './../../../../assets/images/rewind-back-svgrepo-com.svg';

const ReverseIcon = (props) => {

    const handleReverse = (videoRef, e) => {
        videoRef.current.currentTime -= 10;
        e?.stopPropagation();
    }

  useEffect(() => {
    if (props.triggerReverse) {
        handleReverse(props.videoRef)
        props.setTriggerReverse(false);
    }
  }, [props]);

  return (
    <>
      {(props.showIcon || props.triggerReverse) &&
        <div onClick={(e) => handleReverse(props.videoRef, e)}>
          <SvgIcon 
            svgPath={RewindBackIcon} 
            svgName="Rewind" 
          />
        </div>
      }
    </>
  );
};

export default ReverseIcon;