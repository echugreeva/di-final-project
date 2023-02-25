import {useState, useContext} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../../App';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from 'axios'
import { Typography } from '@mui/material';
 
const NewUserToTeam = ({admin_id,team_id,team_name})=>{
    const [input, setInput]=useState('')
    const [msg, setMsg]=useState('')
    const addUser = async() => {
        console.log(admin_id,team_id,team_name, input)
        try{
            const response = await axios.post(`/adduserteam/`, {
                admin_id, team_id, team_name, input
            }, {
                withCredentials:true, 
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            setInput('');
            setMsg(`user was successfully added`)
        }catch (e){
            console.log(e.response.data.msg)
            setMsg(e.response.data.msg)
        }
    }
   

    return (

        <Box component={'form'} 
        sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
            noValidate 
            autoComplete={'off'}>
                <Typography variant="h6" component="h1">Add team members by email</Typography>
            {/* <InputLabel id="userEmail"></InputLabel> */}
            <TextField
                sx={{m:1}}
                id='userEmail'
                label = 'userEmail'
                variant = 'outlined'
                onChange={(e)=>{setInput(e.target.value)}}
                value={input}
                />
        
            
            
            <Button variant = 'contained' onClick={addUser}>Add</Button>
            <p>{msg}</p>
            
       
        </Box>
    )
}

export default NewUserToTeam