import * as React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Main Page" />
      </ListItem>
    </Link>

    <Link to="Data">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Data Management" />
      </ListItem>
    </Link>

    {/* <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Placeholder 1" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Placeholder 2" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
      <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Placeholder 3" />
    </ListItem> */}

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Models</ListSubheader>
    
    <Link to="Kmeans">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="K Means" />
      </ListItem>
    </Link>

    <Link to="Mclp">
      <ListItem button>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="MCLP" />
      </ListItem>
    </Link>
    
    <Link to="Pcm">
      <ListItem button>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="PCM" />
      </ListItem>
    </Link>
    
  </div>
);