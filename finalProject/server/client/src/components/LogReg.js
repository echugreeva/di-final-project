import {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import GridItem from '@mui/material/Grid'

 import { AppContext } from '../App';


const LogReg = (props)=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [fname, setFName]= useState('');
    // const [lname, setLName]= useState('');
    const [msg, setMsg]= useState('');

    const {setAccessToken} = useContext(AppContext);

    const navigate = useNavigate();

    const handleClick = async()=> {
        if(props.title =='Register') {
            try{
                const response = await axios.post('/register', {
                    email, password
                }, {
                    withCredentials:true, 
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
                navigate('/login');
            }catch (e){
                setMsg(e.response.data.msg)
            }
        }else{
            try{
                const response = await axios.post('/login', {
                    email, password
                }, {
                    withCredentials:true, 
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                 console.log(response)
                if(response.status===200){
                    console.log(response)
                    setAccessToken(response.data.token);
                    setMsg('');
                    navigate('/mycabinet');
                    console.log(`login & pass matched`)
                }
                
            }catch (e){
                setMsg(e.response.data.msg)
                console.log(e)
            }
        }

}   


return(
        <Grid  container
        direction="column"
        justifyContent="center"
        alignItems="center" >
            
                <Typography variant="h5" component="h1" sx={{m:2}}>{props.title}</Typography>
            <GridItem component={'form'} sx={{m:1}} noValidate autoComplete={'off'} m="auto" display="flex" direction="column">
            
                <TextField
                sx={{m:1}}
                id='email'
                label = 'Enter email'
                variant = 'outlined'
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <TextField
                sx={{m:1}}
                id='password'
                label = 'Enter password'
                variant = 'outlined'
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <Button variant = 'contained' size="medium" onClick={handleClick} sx={{m:1}}>{props.title}</Button>
                <Typography>{msg}</Typography>
            </GridItem>
            
        </Grid>
    )

}

export default LogReg