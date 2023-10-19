import React, { useEffect } from 'react';

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
            {"Fast Forward >>"}
        </div>
      }
    </>
  );
};

export default ForwardIcon;