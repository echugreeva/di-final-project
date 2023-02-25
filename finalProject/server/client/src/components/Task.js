import { FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material"
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../App';
import { TeamContext } from "./Team";



const Task  = (props)=> {
    const [taskS, setStatus] = useState(props.data.status || '');
    const [assignee, setAssignee] = useState(props.data.assignee_id ||'');
    const [msg, setMsg] = useState('');
    const {lBlistener,setListener }=useContext(AppContext)
    // console.log(props.members)
    console.log(props.data)

      

    let handleStatus = async(event)=> {
        let taskId = props.data.task_id

        let taskStatus = event.target.value;
        try{
            const response = await axios.post('/task/status', {
                taskId, taskStatus
            }, {
                withCredentials:true, 
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        }catch (e){
            setMsg(e.response.data.msg)
        }
        setStatus(event.target.value);
        if(taskStatus == 'done') {
            setListener(lBlistener+1)
        }
          
    }

    let handleAssignee = async(event)=> {
        let taskId = props.data.task_id;
        let assigneeId = event.target.value;
        try{
            const response = await axios.post('/task/assignee', {
                taskId, assigneeId
            }, {
                withCredentials:true, 
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        }catch (e){
            setMsg(e.response.data.msg)
        }
        setAssignee(event.target.value);

          
    }
    // console.log(props.members)
    if (props.members==[]){
        return (
            <>loading</>
        )
    } else {
        return (
            <TableRow>
                <TableCell>{props.data.description}</TableCell>
                <TableCell>
                <FormControl medium='true'>
                    <InputLabel id="assignee">Assignee</InputLabel>
                    <Select
                        
                        labelId="assignee"
                        id="assignee"
                        value={assignee}
                        label="assignee"
                        onChange={handleAssignee}
                    >
                        
                       
                        {
                            props.members.map((item,i)=>{
                                if(props.members.length>1){
                                    return (
                                        <MenuItem key = {i} value={item.id}>{item.email}</MenuItem>
                                    )
                                }
                                
                                
                            })
                        }
            
                    </Select>
                </FormControl>
        
                </TableCell>
                <TableCell>
                    <FormControl  medium='true'>
                        <InputLabel id="taskStatus">Status</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={taskS}
                            label="taskStatus"
                            onChange={handleStatus}
                        >
                    
                            <MenuItem color='primary' value={'to do'}><Typography color='error'>To Do</Typography></MenuItem>
                            <MenuItem value={'in process'}><Typography color='primary'>In process</Typography></MenuItem>
                            <MenuItem value={'done'}><Typography sx={{color:'#00796b', fontWeight:'bold'}} >Done</Typography></MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
        
                <TableCell>{props.data.completion_time}</TableCell>
                <TableCell>{props.data.duedate.substr(0,10)}</TableCell>
            </TableRow>
            )
    }
    
}

export default Task