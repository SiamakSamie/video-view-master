import React from 'react';

const SvgIcon = (props) => {
  return (
    <>
      {(props.svgPath || props.svgName) &&
        <img src={props.svgPath} alt={props.svgName} />
      }
    </>
  );
};

export default SvgIcon;
