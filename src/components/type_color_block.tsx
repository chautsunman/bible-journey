import * as React from 'react';

import Box from '@mui/material/Box';

interface TypeColorBlockProps {
  color: string;
  onClick?: React.MouseEventHandler;
}

const TypeColorBlock = (props: TypeColorBlockProps) => {
  const additionalSx: any = {};
  if (props.onClick) {
    additionalSx['cursor'] = 'pointer';
  }

  return (
    <Box
      component="div"
      sx={{display: 'inline-block', width: '10px', height: '10px', backgroundColor: props.color, ...additionalSx}}
      onClick={props.onClick}/>
  );
};

export default TypeColorBlock;
