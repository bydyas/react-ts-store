import { styled } from '@mui/system';
import Container from '@mui/material/Container';

export const Wrapper = styled(Container)(({ theme }) => ({
  paddingLeft: '15px',
  paddingRight: '15px',
  height: '100%',
  maxWidth: theme.breakpoints.values.lg,
}));
