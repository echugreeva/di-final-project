import { useContext, useEffect, useState, createContext } from 'react';
import MyTeams from './MyTeams'
import AddTeam from './AddTeam'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App';
import ErrorBoundary from '../ErrorBoundary';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import NewTaskList from './NewTaskList';
export const CabinetContext = createContext();



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MyCabinet = (props) => {
    const [firstTeamlistener, setListener] = useState(0)
    const [token, setToken] = useState({});
    const { accessToken, setId, userId, setTeam, teamId, setTL, tLId } = useContext(AppContext);
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [myTeams, setTeams] = useState([]);
    
    useEffect(() => {
        if (userId > 0) {
            fetch(`/myteams/${userId}`)
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    }
                }
                )
                .then(data =>{
                    setTeams(data)
                    console.log(data)
                }
                    
                )
                .catch(e => { console.log(e) })
        }

    }, [userId,firstTeamlistener])

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        try {
            const decode = jwt_decode(accessToken)
            console.log(decode);
            setToken(decode);
            const expire = decode.exp;
            setId(decode.userId)
            if (expire * 10000 < new Date().getTime()) {
                navigate('../login');
            } 
            if (userId < 1) {
                setId(decode.userId)
            }


        }
        catch (e) {
            navigate('../login');
        }

    }, [])
    console.log(userId)

    return (
        <CabinetContext.Provider value={{firstTeamlistener, setListener}}>
       
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="My teams" {...a11yProps(0)} />
                    <Tab label="Add Task List" {...a11yProps(1)} />
                    <Tab label="Add Team" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ErrorBoundary><MyTeams myTeams={myTeams} handleTabChange = {handleTabChange}/></ErrorBoundary>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ErrorBoundary><NewTaskList myTeams={myTeams} /></ErrorBoundary>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ErrorBoundary><AddTeam /></ErrorBoundary>
            </TabPanel>
        </Box>
        </CabinetContext.Provider>

    )
}

export default MyCabinet