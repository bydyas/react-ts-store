import React from 'react';

import Avatar from '@mui/material/Avatar';

type AvatarProps = {
  photoURL?: string;
  displayName: string;
  size?: number;
};

const AvatarSection: React.FC<AvatarProps> = ({ photoURL, displayName, size = 40 }) => {
  const firstName: string = displayName?.split(' ')[0];
  const lastName: string = displayName?.split(' ')[1];
  const initials = `${firstName[0]}${lastName[0]}`;

  return (
    <Avatar src={null || photoURL} alt={photoURL || displayName} sx={{ width: size, height: size }}>
      {photoURL || initials}
    </Avatar>
  );
};

export default AvatarSection;
