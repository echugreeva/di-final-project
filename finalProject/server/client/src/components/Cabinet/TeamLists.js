
import { useEffect, useState } from "react"
import TaskList from "../TaskList"
import NewTaskList from "./NewTaskList"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';

const TeamLists = (props) => {
    console.log(props.myTeams)
    const [tl, setTL] = useState([])
    const [load, setLoad] = useState(false)
    useEffect(() => {
        if (props.teamId > 0) {
            fetch(`/teamlists/${props.teamId}`)
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    }
                }
                )
                .then(data =>
                    setTL(data)
                    // console.log(data)
                )
                .catch(e => { console.log(e) })
        }

    }, [props.teamId])

    const handleTasksLoad = (e) => {

        setLoad(current => !current);
        console.log(load)

    };

    if (tl.length < 1) {
        return (
            <>
                <div>this team has no task lists</div>
                <Button onClick={(e)=> {
                    props.handleTabChange(e,1)
                }}>add new list</Button>
            </>

        )
    } else {
        return (
            <div>
                {
                    tl.map((item, i) => {
                        return (
                            <Accordion>
                                <AccordionSummary key={i} 
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    onClick={()=>{handleTasksLoad()}}
                                    >
                                    <Typography variant="p" component="p" sx={{ m: 1 }}>List name: {item.list_name} </Typography>
                                    <Typography variant="p" component="p" sx={{ m: 1 }}>Due date: {item.duedate.substr(0,10)} </Typography>

                                </AccordionSummary>
                                <AccordionDetails 
                                >
                                    {/* {load&&<TaskList tlId={item.tl_id} />} */}
                                </AccordionDetails>
                            </Accordion>


                        )
                    })
                }
    
            </div>
        )
    }

}

export default TeamLists