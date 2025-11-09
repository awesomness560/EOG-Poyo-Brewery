import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
          bgcolor: '#1B041E'
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
          icon={<MapIcon />}
          onClick={() => navigate('/map')}
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'white' },
          }}
        />
        <BottomNavigationAction
          label=""
          icon={<AutoAwesomeIcon />}
          onClick={() => navigate('/predictions')}
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'white' },
          }}
        />
        <BottomNavigationAction
          label=""
          icon={<HistoryEduIcon />}
          onClick={() => navigate('/history')}
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'white' },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}