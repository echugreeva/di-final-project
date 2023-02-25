import { getMyTeams, getTeamLists, addTaskList, addTasks, addTeam, addUserToTeam, userExistInTeam, members, taskIds, userExistsInDB } from '../modules/Cabinet.js';
import {login} from '../modules/Users.js'

//use try and catch inside async await, cause db is disconnected




  export const _getMyTeams = (req, res) => {
    getMyTeams(req.params.uid)
      .then(data => {
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })
  }

  export const _getTeamLists = (req, res) => {
    getTeamLists(req.params.tid)
      .then(data => {
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })
  }



  export const _addTaskList = async (req, res) => {

    addTaskList(req.body)
      .then(data => {
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })

  }

  export const _addTasks = async (req, res) => {
    const tl_id = req.params.tlid
    console.log(req.body)
    const tasksToInsert = req.body.inputList.map((insert) => {
      insert.completion_time = Number(insert.completion_time);
      return (

        {
          tl_id: tl_id,
          duedate: insert.duedate,
          description: insert.description,
          completion_time: insert.completion_time
        }
      )

    })
    addTasks(tasksToInsert)
      .then(data => {
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })

  }




  export const _addTeam = async (req, res) => {

    addTeam(req.body.userId, req.body.name)
      .then(data => {
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })

  }

  export const _addUserToTeam = async (req, res) => {

    userExistsInDB(req.body.input)

      .then((data) => {
        // json(data);
        console.log(data[0].id);
        let userId = data[0].id
        console.log(req.body.team_id);
        userExistInTeam(userId, req.body.team_id)
          .then((result) => {
            if (result == []) {
              console.log('user already in this team')
              res.status(404).json({ msg: 'user already in this team' })

            } else {
              addUserToTeam(req.body.admin_id, req.body.team_id, req.body.team_name, userId)
                .then(data => {
                  res.json(data)
                  console.log(data)
                })
            }

          })

      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'email not found, to add user they need to be registered in the app' })
      })


  }





  export const _members = (req, res) => {

    members(req.params.tlid)
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })
  }
  export const _taskIds = (req, res) => {

    taskIds(req.params.tlid)
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })
  }

