import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import axios from 'axios'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import GridItem from '@mui/material/Grid'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const NewTask = (props) => {
    let today = new Date()
    const [inputList, setInputList] = useState([{ description: '', completion_time: '', duedate: today }])
    // const [assignees, setAssignees] = useState([]);
    const [taskIds, setIds] = useState([]);
    const [msg, setMsg] = useState([]);


    const handleDateInput = (value, i) => {
        const list = [...inputList];
        list[i].duedate = value;
        setInputList(list)
        console.log(inputList)
    }

    const handleDescInput = (e, i) => {
        const list = [...inputList];
        list[i].description = e.target.value;
        setInputList(list)
        // console.log(inputList)
    }

    const handleTimeInput = (e, i) => {
        const list = [...inputList];
        list[i].completion_time = e.target.value;
        setInputList(list)
        console.log(inputList)
    }

    const handleAddClick = () => {
        setInputList([...inputList, { description: '', completion_time: '', duedate: today }]);
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const addTasks = async () => {
        try {
            const response = await axios.post(`/addtasks/${props.tl_id}`, {
                inputList
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);

        } catch (e) {
            console.log(e.response.data.msg)
        }

    }

   
    const handleAssignee = async (task, assignee) => {
        let taskId =task
        let assigneeId=assignee
        console.log(taskId)
        console.log(assigneeId)
        try {
            const response = await axios.post('/task/assignee', {
                taskId, assigneeId
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (e) {
            setMsg(e.response.data.msg)
        }
    }

    const assignRandomAssignee = async () => {
        let members2 = await(fetch(`/getmembers/${props.tl_id}`)
        .then(res => {
            if (res.status == 200) {
                return res.json()
            }
            console.log(res)
        }
        ))
        console.log(members2);
        let ids = await (fetch(`/gettaskIds/${props.tl_id}`)
        .then(res => {
            if (res.status == 200) {
                return res.json()
            }
        }
        ))
        console.log(ids);
            
    
       
        ids.map((item) => {
                let picked = members2[Math.floor(Math.random() * members2.length)]
                    handleAssignee(item.task_id, picked.users)
                }        
        )


    }

return (
    <Grid container
    direction="column"
    justifyContent="center"
    alignItems="center" 
    sx={{ m: 2 }}>
        
        <Typography variant="h5" component="h1">Add your tasks</Typography>
        
            {
                inputList.map((item, i) => {
                    return (
                        <Box component={'form'}  noValidate autoComplete={'off'}
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            textAlign:'right'
                          }}>
                            <TextField
                                sx={{ m: 1 }}
                                id='description'
                                label='description'
                                variant='outlined'
                                value={item.description}
                                onChange={(e) => { handleDescInput(e, i) }}
                            />
                            <TextField
                                sx={{ m: 1 }}
                                id='completion_time'
                                label='completion_time'
                                variant='outlined'
                                type='number'
                                value={item.completion_time}
                                onChange={(e) => { handleTimeInput(e, i) }}
                                name='completion_time'
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="dueDate"
                                    label="dueDate"
                                    name='dueDate'
                                    inputFormat="MM/DD/YYYY"
                                    value={item.duedate}
                                    sx={{ m: 2 }}
                                    onChange={(newValue) => {
                                        // setDateTask(newValue);
                                        handleDateInput(newValue, i)

                                    }}
                                    renderInput={
                                        (params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            
                                
                                {inputList.length - 1 === i && <Fab  size='small' sx={{ m: 2 }}variant='contained' color='primary' onClick={handleAddClick}><AddIcon ></AddIcon></Fab>}
                                {inputList.length !== 1 && <Fab size='small' sx={{ m: 2 }}variant='contained' color='warning' onClick={()=>{handleRemoveClick(i)}}><DeleteForeverIcon></DeleteForeverIcon></Fab>}
                            
                        </Box>
                    )
                })
            }

       
        <Button sx={{ m: 1 }}variant='contained' color='success' onClick={addTasks}>Publish List</Button>
        <Typography variant="p" component="p">Want destiny to decide who works on which task? Use randomiser</Typography>
        <Button sx={{ m: 1 }} variant='contained' color='secondary' onClick={assignRandomAssignee}>Randomize task assignees</Button>
        
    </Grid>
)
}

export default NewTask