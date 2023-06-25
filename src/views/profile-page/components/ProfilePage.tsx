import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFirebase } from '../../../hooks/useFirebase';

const ProfilePage: React.FC = () => {
  const { user } = useFirebase();

  return (
    <Box>
      <Typography component="h1" variant="h5">
        {user?.displayName}
        <br />
        {user?.email}
      </Typography>
    </Box>
  );
};

export default ProfilePage;
