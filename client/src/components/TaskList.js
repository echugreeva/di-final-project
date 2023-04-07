import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../App';
import Task from './Task'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Theme from '../Theme'

const TaskList = (props) => {
  const { teamId } = useContext(AppContext)
  // const [members, setMemebers] = useState([]);
  const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   if (teamId > 0) {
  //     fetch(`/teams/${teamId}`)
  //       .then(res => {
  //         if (res.status == 200) {
  //           return res.json()
  //         }
  //       }
  //       )
  //       .then(data => {
  //         setMemebers(data)
  //         console.log(data)
  //       }

  //       )
  //       .catch(e => { console.log(e) })
  //   }

  // }, []);

  useEffect(() => {
    if (props.tlId > 0) {
      fetch(`/tasks/${props.tlId}`)
        .then(res => {
          if (res.status == 200) {
            return res.json()
          }
        }
        )
        .then(data => {
          setTasks(data)
          console.log(data)
        }

        )
        .catch(e => { console.log(e) })
    }

  }, [props.tlId])




  if (tasks == []) {
    return (
      <div>checking tasks</div>
    )
  } else {
    return (
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
          Your team tasks:
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: Theme.palette.secondary.light}}>
              <TableCell>Description</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time To Complete</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tasks.map((item, i) => {
                return (
                  <Task key={i} data={item} members={props.members} />
                )
              })
            }
          </TableBody>

        </Table>
      </Grid>

    )
  }

}

export default TaskList