import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

type CopyrightProps = {
  name: string;
  link: string;
}

function Copyright({name, link}: CopyrightProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={link}>
        {name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;