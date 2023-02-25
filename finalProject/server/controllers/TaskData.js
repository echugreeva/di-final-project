import {getTasks, updateTaskStatus, updateAssignee } from '../modules/TaskData.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { json } from 'sequelize';

//use try and catch inside async await, cause db is disconnected

// export const _register = async (req, res) => {

//   console.log(req.body);
//   const salt = await bcrypt.genSalt();
//   const hashPassword = await bcrypt.hash(req.body.password, salt);
//   req.body.password = hashPassword;

//   register(req.body)
//     .then(data => {
//       res.json(data)
//     })
//     .catch(e => {
//       console.log(e);
//       res.status(404).json({ msg: 'not found' })
//     })

// }


// export const _login = async (req, res) => {
//   //  console.log(req.body);
//   // let email=req.body.email;
//   // let userId;
//   login(req.body.email)
//     .then((data) => {
//       console.log(data[0])
//       let email = data[0].email;
//       let userId = data[0].id;

//       //   console.log("data deom db login" + data.length)
//       const match = async () => await bcrypt.compare(req.body.password, data[0].password);
//       match()
//         .then(data => {
//           // data.json()
//           console.log(data)
//           if (!data) {
//             return res.status(400).json({ msg: 'wrong password' })
//           }

//         })

//       const accessToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '600s' })

//       console.log(accessToken)

//       res.cookie('accessToken', accessToken, {
//         httpOnly: true,
//         maxAge: 60 * 10000
//       });


//       res.json({ token: accessToken })


//       // if(!correctPass) return res.status(400).json({msg:'wrong password'});

//     })
//     .catch(e => {
//       console.log(e);
//       res.status(404).json({ msg: 'email not found' })
//     })

// }

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

export const _getTasks = (req, res) => {
  getTasks(req.params.tlid)
    .then(data => {
      res.json(data)
    })
    .catch(e => {
      console.log(e);
      res.status(404).json({ msg: 'not found' })
    })
}



  export const _updateTaskStatus = (req, res) => {
    updateTaskStatus(req.body.taskId, req.body.taskStatus)
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })
  }

  export const _updateAssignee = (req, res) => {
    console.log(req.body)
    updateAssignee(req.body.taskId, req.body.assigneeId)
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(e => {
        console.log(e);
        res.status(404).json({ msg: 'not found' })
      })
  }

