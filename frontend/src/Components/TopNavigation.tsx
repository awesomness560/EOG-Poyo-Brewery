import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';


export default function TopNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  
  return (
    <Paper
      sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ 
          width: '100%',
          bgcolor: 'black' // Add black background here
        }}
      >
        <BottomNavigationAction
          label=""
          icon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'white' },
          }}
        />
        <BottomNavigationAction
          label=""
          icon={<FavoriteIcon />}
          onClick={() => navigate('/map')}
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'white' },
          }}
        />
        <BottomNavigationAction
          label=""
          icon={<ArchiveIcon />}
          onClick={() => navigate('/predictions')}
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'white' },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}