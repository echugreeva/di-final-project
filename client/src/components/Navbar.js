import { Link, useNavigate,useLocation} from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RuleIcon from '@mui/icons-material/Rule';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logoimg from '../logoimg.png'

import axios from 'axios';
 import {useContext} from 'react'
 import { AppContext } from '../App';

const Navbar = (props) => {
    const {setAccessToken} = useContext(AppContext)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const location = useLocation();
    console.log(location.pathname);
    //if location.pathname x return logout not login/reg
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = async()=> {
        try{
            const response = await axios.delete('/logout', {}, 
                {
                withCredentials:true, 
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            console.log(response)
            if(response.status == 200 || 204){
                setAccessToken('');
                navigate('/login');
            }

            }
        
        catch (e){
            console.log(e)
            navigate('/login')
        }
    }

    if (location.pathname === '/mycabinet' || location.pathname === '/team') {
        return (
            
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button component={Link} to='/'><img src={logoimg} style={{height:'3em'}}/></Button>
                          
                         
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}>
                                    <MenuItem> <Link to='/mycabinet'>My Cabinet</Link></MenuItem>
                                    <MenuItem> <Link to='/logout'>Login</Link></MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
                                <Stack spacing={1} direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    <Button component={Link} variant="contained" size="medium" to='/mycabinet'>My Cabinet</Button>
                                </Stack>
                                
                                <Stack spacing={1} direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', flexDirection: 'row' }, justifyContent: 'flex-end' }}>
                                    <Button variant="contained" color='secondary' size="medium" onClick={logout}>Logout</Button>
                                </Stack>
                            </Box>
        
        
                        </Toolbar>
        
                    </Container>
                    <Stack spacing={2} direction="row">
                        {/* <Button component={Link} to='/'><RuleIcon color="success" sx={{ fontSize: 40 }}></RuleIcon></Button> */}
        
                        {/* <Button component={Link} to='/team'>Team</Button> */}
                        {/* <Button component={Link} size="medium" to='/mycabinet'>My Cabinet</Button>
                        <Button variant="outlined" size="medium" component={Link} to='/login'>Login</Button>
                        <Button variant="contained" size="medium" component={Link} to='/register'>Register</Button> */}
                    </Stack>
                </AppBar>
        )
    }else {
        return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button component={Link} to='/'><img src={logoimg} style={{height:'3em'}}/></Button>
                      
                     
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}>
                                <MenuItem> <Link to='/mycabinet'>My Cabinet</Link></MenuItem>
                                <MenuItem> <Link to='/login'>Login</Link></MenuItem>
                                <MenuItem> <Link to='/register'>Register</Link></MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
                            <Stack spacing={1} direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Button component={Link} variant="contained" size="medium" to='/mycabinet'>My Cabinet</Button>
                            </Stack>
                            
                            <Stack spacing={1} direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', flexDirection: 'row' }, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" color='secondary' size="medium" component={Link} to='/login'>Login</Button>
                                <Button variant="contained" color='secondary' size="medium" component={Link} to='/register'>Register</Button>
                            </Stack>
                        </Box>
    
    
                    </Toolbar>
    
                </Container>
                <Stack spacing={2} direction="row">
                    {/* <Button component={Link} to='/'><RuleIcon color="success" sx={{ fontSize: 40 }}></RuleIcon></Button> */}
    
                    {/* <Button component={Link} to='/team'>Team</Button> */}
                    {/* <Button component={Link} size="medium" to='/mycabinet'>My Cabinet</Button>
                    <Button variant="outlined" size="medium" component={Link} to='/login'>Login</Button>
                    <Button variant="contained" size="medium" component={Link} to='/register'>Register</Button> */}
                </Stack>
            </AppBar>
        )
    }
    

}

export default Navbar

//    {/* <img src={logoimg} style={{height:'3em'}}/> */}
{/* <RuleIcon color="success" sx={{ fontSize: 40 }}></RuleIcon> */}