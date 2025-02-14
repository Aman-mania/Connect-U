import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import worker from "../assets/worker.png"
// import WorkIcon from '@material-ui/icons/Work';


import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
  Tooltip,
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import logoImage from '../assets/logo.png';
import profileImage from '../assets/profile.png';

// const baseURL = "https://hr.aiassistant.co:8443/api/v1/";

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Navbar = styled(AppBar)(({ theme }) => ({
  zIndex: 1400,
  backgroundColor: '#fff',
  boxShadow: 'none',
  padding: theme.spacing(1, 2),
}));

const Logo = styled('img')({
  width: "250px",
  height: "40px",
  marginRight: '160px',
});

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: '#f0f0f0',
  marginRight: theme.spacing(2),
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  '& .MuiInputBase-input': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '100%',
  },
}));

const ProfileContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  marginRight: theme.spacing(1),
}));

const jobTitles = [
  'Painter',
  'Construction Worker',
  'Electrician',
  'Mechanic',
  'Plumber',
  'Carpenter',
  'Welder',
  'Chef',
  'Nurse',
  'Teacher',
];

export const DashboardClient = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormOpen, setEditFormOpen] = useState(false); // Add this state
  const [open, setOpen] = useState(false); // State for dropdown
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;

  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const res = await axios.get(`${baseURL}users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUserDetails(res.data);
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      };
      fetchUserDetails();
    }
  }, [userId]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate('/');
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      // Perform search logic here
      console.log('Search for:', searchTerm);
      setOpen(false); // Close dropdown on search
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setOpen(value.length > 0); // Show dropdown if there is input
    setFilteredJobs(jobTitles.filter(job => job.toLowerCase().includes(value.toLowerCase()))); // Filter jobs
  };

  const handleJobSelect = (job) => {
    setSearchTerm(job);
    setOpen(false); // Close dropdown on selection
  };

  return (
    <Root>
      <CssBaseline />
      <Navbar position="static">
        <Toolbar>
        <a href='/client'>
          <Logo src={logoImage} alt="Logo" />
        </a>
          <SearchContainer>
            <Search>
              <StyledInputBase
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleSearch}
              />
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Search>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                      <Box>
                        {filteredJobs.length > 0 ? (
                          filteredJobs.map((job, index) => (
                            <MenuItem key={index} onClick={() => handleJobSelect(job)}>
                              {job}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No jobs found</MenuItem>
                        )}
                      </Box>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </SearchContainer>
          <a href='/client/list'><h2 className='text-slate-950'>Workers</h2></a>
          <ProfileContainer>
            <Tooltip title="Profile options">
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="Profile" src={profileImage} />
              </IconButton>
            </Tooltip>
            <a href='/client/notification'><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg></a>
            {/* <ProfileName>
              {userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : 'Loading...'}
            </ProfileName> */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { 
                  handleMenuClose(); 
                  setEditFormOpen(true);
              }}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
            </Menu>
          </ProfileContainer>
        </Toolbar>
      </Navbar>
      <Dialog open={editFormOpen} maxWidth="md" fullWidth>
        <DialogContent>
        </DialogContent>
      </Dialog>
    </Root>
  );
};
