import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import { Website } from '../components/Website';


import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Dialog,
    DialogContent,
} from '@mui/material';
import {
    Search as SearchIcon,
} from '@mui/icons-material';
import logoImage from '../assets/logo.png';


// const baseURL = "https://hr.aiassistant.co:8443/api/v1/";

const Root = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const Navbar = styled(AppBar)(({ theme }) => ({
    // minHeight:'100vh',
    margin:0,
    zIndex: 1400,
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: theme.spacing(4, 8),
}));

const Logo = styled('img')({
    width: "250px",
    height: "40px",
    marginRight: '160px',
});



export const Home_without_signin = () => {
    const [editFormOpen, setEditFormOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Root>
            <CssBaseline />
            <Navbar position="static">
                {/* <Toolbar> */}
                    <div className='flex justify-between'>
                        <div>
                            <Logo src={logoImage} alt="Logo" />
                        </div>
                        <div class="flex space-x-4">
                            <a href="/signup" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-white-500">Sign Up</a>
                            <a href="/signin" class="border border-black text-black px-4 py-2 rounded hover:border-gray-300">Log In</a>
                        </div>
                    </div>
                {/* </Toolbar>     */}
            </Navbar>
            <Website/>
            <Dialog open={editFormOpen} maxWidth="md" fullWidth>
                <DialogContent>
                </DialogContent>
            </Dialog>
        </Root>
    );
};








