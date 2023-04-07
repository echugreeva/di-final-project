import { register, login } from '../modules/Users.js';
//import {userExistsInDB} from '../modules/Cabinet.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { json } from 'sequelize';

//use try and catch inside async await, cause db is disconnected

export const _register = async (req, res) => {

  console.log(req.body);
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;

  register(req.body)
    .then(data => {
      res.json(data)
    })
    .catch(e => {
      console.log(e);
      res.status(404).json({ msg: 'not found' })
    })

}

export const _login2 = async (req, res) => {

try {
  const user = await login(req.body.email);
  const match = await bcrypt.compare(req.body.password, user[0].password);
  if(!match) return res.status(400).json({msg:'wrong password'});

  const userId = user[0].id;
  const email = req.body.email;

  const accessToken = jwt.sign({userId,email}, process.env.ACCESS_TOKEN_SECRET,
         {expiresIn:'60s'})

  res.cookie('accessToken', accessToken, {
      httpOnly:true,
      maxAge: 60*1000
  });

  res.json({token: accessToken})

  
}
catch(e){
  console.log(e);
  res.status(404).json({msg:'email not found'})
}
}

export const _login = async (req, res) => {
  //  console.log(req.body);
  // let email=req.body.email;
  // let userId;
  login(req.body.email)
    .then((data) => {
      console.log(data[0])
      let email = data[0].email;
      let userId = data[0].id;

      //   console.log("data deom db login" + data.length)
      const match = async () => await bcrypt.compare(req.body.password, data[0].password);
      match()
        .then(data => {
          // data.json()
          console.log(data)
          if (data === false) {
            console.log('wrong pass')
            return res.status(400).json({ msg: 'wrong password' })
          } else {

            const accessToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '120s' })

            console.log(accessToken)

            res.cookie('accessToken', accessToken, {
              httpOnly: true,
              maxAge: 120 * 1000
            });


            res.json({ token: accessToken })
          }
        })

    })
    .catch (e => {
  console.log(e);
  res.status(404).json({ msg: 'email not found' })
})

}

export const logout = (req, res) => {

  const accessToken = req.cookies.accessToken;
  console.log(accessToken);
  if (!accessToken) return res.status(204).json({ msg: 'cleared' });
  res.clearCookie('accessToken');
  console.log(req.cookies.accessToken)
  return res.status(200).json({ msg: 'cleared' })

}


// export const _team = (req, res) => {
//   team(req.params.tid)
//     .then(data => {
//       console.log(data)
//       res.json(data)
//     })
//     .catch(e => {
//       console.log(e);
//       res.status(404).json({ msg: 'not found' })
//     })
// }

// export const _getTasks = (req, res) => {
//   getTasks(req.params.tlid)
//     .then(data => {
//       res.json(data)
//     })
//     .catch(e => {
//       console.log(e);
//       res.status(404).json({ msg: 'not found' })
//     })
// }

// export const _leaderBoardData = (req, res) => {
//   let today = new Date();
//   currentList(req.params.teamid, today)
//     .then(data => {
//       console.log(data.length)
//       if (data.length < 1) {
//         res.status(404).json({ msg: 'not found' })
//       } else {
//         let currListId = data[0].tl_id;
//         leaderBoardData(req.params.teamid, currListId)
//           .then(data => {
//             // console.log(data)
//             res.json(data)
//           })
//           .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: 'not found' })
//           })

//       }
//     })
//   }




  // export const _updateTaskStatus = (req, res) => {
  //   updateTaskStatus(req.body.taskId, req.body.taskStatus)
  //     .then(data => {
  //       console.log(data)
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }

  // export const _updateAssignee = (req, res) => {
  //   console.log(req.body)
  //   updateAssignee(req.body.taskId, req.body.assigneeId)
  //     .then(data => {
  //       console.log(data)
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }

  // export const _getMyTeams = (req, res) => {
  //   getMyTeams(req.params.uid)
  //     .then(data => {
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }

  // export const _getTeamLists = (req, res) => {
  //   getTeamLists(req.params.tid)
  //     .then(data => {
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }



  // export const _addTaskList = async (req, res) => {

  //   addTaskList(req.body)
  //     .then(data => {
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })

  // }

  // export const _addTasks = async (req, res) => {
  //   const tl_id = req.params.tlid
  //   console.log(req.body)
  //   const tasksToInsert = req.body.inputList.map((insert) => {
  //     insert.completion_time = Number(insert.completion_time);
  //     return (

  //       {
  //         tl_id: tl_id,
  //         duedate: insert.duedate,
  //         description: insert.description,
  //         completion_time: insert.completion_time
  //       }
  //     )

  //   })
  //   addTasks(tasksToInsert)
  //     .then(data => {
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })

  // }




  // export const _addTeam = async (req, res) => {

  //   addTeam(req.body.userId, req.body.name)
  //     .then(data => {
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })

  // }

  // export const _addUserToTeam = async (req, res) => {

  //   login(req.body.input)

  //     .then((data) => {
  //       json(data);
  //       console.log(data[0].id);
  //       let userId = data[0].id
  //       console.log(req.body.team_id);
  //       userExistInTeam(userId, req.body.team_id)
  //         .then((result) => {
  //           json(result);
  //           if (result == []) {
  //             console.log('user already in this team')
  //             res.status(404).json({ msg: 'user already in this team' })

  //           } else {
  //             addUserToTeam(req.body.admin_id, req.body.team_id, req.body.team_name, userId)
  //               .then(data => {
  //                 res.json(data)
  //                 console.log(data)
  //               })
  //           }

  //         })

  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'email not found, to add user they need to be registered in the app' })
  //     })


  // }



  // export const _currentList = (req, res) => {
  //   let today = new Date()
  //   currentList(req.params.tid, today)
  //     .then(data => {
  //       // console.log(data)
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }

  // export const _members = (req, res) => {

  //   members(req.params.tlid)
  //     .then(data => {
  //       console.log(data)
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }
  // export const _taskIds = (req, res) => {

  //   taskIds(req.params.tlid)
  //     .then(data => {
  //       console.log(data)
  //       res.json(data)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(404).json({ msg: 'not found' })
  //     })
  // }

