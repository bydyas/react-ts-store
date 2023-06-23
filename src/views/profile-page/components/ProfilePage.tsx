import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useFirebase } from '../../../hooks/useFirebase';

const ProfilePage: React.FC = () => {
  const { user, logout } = useFirebase();

  return (
    <Box>
      <Typography component="h1" variant="h5">
        {user?.displayName}
      </Typography>
      <Button onClick={logout} type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default ProfilePage;