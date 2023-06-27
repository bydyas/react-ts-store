import React from 'react';
import { useFirebase } from '../../../hooks/useFirebase';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import AvatarSection from '../../../ui/AvatarSection';

const Section = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  display: 'flex',
  flexWrap: 'wrap',
  height: '100%',
  columnGap: '5%',
  rowGap: '15%',
}));

const FiftyBox = styled(Box)({
  flex: '45%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ProfilePage: React.FC = () => {
  const { user } = useFirebase();

  return (
    <Section>
      <FiftyBox>
        <AvatarSection photoURL={user?.photoURL} displayName={user!.displayName} size={100} />
      </FiftyBox>
      <FiftyBox>
        <Typography component="h1" variant="h5">
          {user?.displayName}
          <br />
          {user?.email}
        </Typography>
      </FiftyBox>
    </Section>
  );
};

export default ProfilePage;
