import {team,  leaderBoardData, currentList} from '../modules/TeamPage.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { json } from 'sequelize';

//use try and catch inside async await, cause db is disconnected


export const _team = (req, res) => {
  team(req.params.tid)
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(e => {
      console.log(e);
      res.status(404).json({ msg: 'not found' })
    })
}
export const _currentList = (req, res) => {
  let today = new Date()
  currentList(req.params.tid, today)
    .then(data => {
      // console.log(data)
      res.json(data)
    })
    .catch(e => {
      console.log(e);
      res.status(404).json({ msg: 'not found' })
    })
}



export const _leaderBoardData = (req, res) => {
  let today = new Date();
  currentList(req.params.teamid, today)
    .then(data => {
      console.log(data.length)
      if (data.length < 1) {
        res.status(404).json({ msg: 'not found' })
      } else {
        let currListId = data[0].tl_id;
        leaderBoardData(req.params.teamid, currListId)
          .then(data => {
            // console.log(data)
            res.json(data)
          })
          .catch(e => {
            console.log(e);
            res.status(404).json({ msg: 'not found' })
          })

      }
    })
  }



 
