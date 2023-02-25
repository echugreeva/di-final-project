//add name -> fetch post name & his id, as admin and user then team id comes back second fetch with email of a memeber 
// if email exist in db add user if not, send message ask user to reg in the app


import {useState, useContext} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../../App';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import AddUserToTeam from './AddUserToTeam'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import GridItem from '@mui/material/Grid'
import { CabinetContext } from './MyCabinet';
 
const NewTeam = (props)=>{
    const {userId} = useContext(AppContext);
    const [team_id, setTeamId] = useState('');
    const [name, setTeamName] = useState('');
    const [addUserShown, setShown]= useState(false);
    const [msg, setMsg]=useState('')
    const {firstTeamlistener, setListener}=useContext(CabinetContext)

    const handleClick = event => {
        
        setShown(true);
    
      };

    const addTeam = async() => {
        if (name) {
            try{
                const response = await axios.post(`/addteam/`, {
                    userId, name
                }, {
                    withCredentials:true, 
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
                setTeamId(response.data[0].team_id)
                setListener(firstTeamlistener+1)
                
            }catch (e){
                console.log(e.response.data.msg)
                setMsg(e.response.data.msg)
            }
        } else {
            setMsg('team name cannot be empty')
        }
        
        
    }
    console.log(team_id);
    console.log(name);
   

    return (
        <Grid  container
        direction="column"
        justifyContent="center"
        alignItems="center" >
             <Typography variant="h5" component="h1">Add new team</Typography>
            <Box 
        component={'form'} 
        noValidate 
        autoComplete={'off'}
        sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {/* <InputLabel id="teamId">Team Name</InputLabel> */}
            <TextField
                sx={{m:1}}
                id='teamName'
                label = 'Team Name'
                variant = 'outlined'
                onChange={(e)=>{setTeamName(e.target.value)}}
                value={name}
                />
        
            
            {
                <Button variant = 'contained' onClick={()=>{
    
                    addTeam()
                    handleClick()
                    }}>Add users</Button>
            }
            <Typography>{msg}</Typography>
            
            {
               addUserShown&& <AddUserToTeam team_id={team_id} team_name={name} admin_id={userId}/>
            }
            
       
        </Box>
        

        </Grid>
        
    )
}

export default NewTeam