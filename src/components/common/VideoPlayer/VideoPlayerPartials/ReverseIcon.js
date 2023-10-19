import React, { useEffect } from 'react';

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
            {"<< Rewind"}
        </div>
      }
    </>
  );
};

export default ReverseIcon;