import express from "express";
import { _team, _leaderBoardData, _currentList} from "../controllers/TeamPage.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";


const teamPageRouter = express.Router();


teamPageRouter.get('/currentlist/:tid',_currentList)
teamPageRouter.get('/leaderboard/:teamid', _leaderBoardData);
teamPageRouter.get('/teams/:tid', _team);


// router.post('/register', _register);
// router.post('/login', _login);

// router.get('/teams/:tlid', _team);

// router.post('/task/status', _updateTaskStatus);
// router.post('/task/assignee', _updateAssignee);
// router.get('/myteams/:uid', _getMyTeams);
// router.get('/teamlists/:tid', _getTeamLists);
// router.post('/addlist/', _addTaskList);
// router.post('/addtasks/:tlid', _addTasks);
// router.post('/addteam/', _addTeam);
// router.post('/adduserteam/',_addUserToTeam);
// router.get('/token', VerifyToken, (req, res)=>{
//     res.sendStatus(200)
// })

// router.get('/getmembers/:tlid', _members);
// router.get('/gettaskIds/:tlid', _taskIds);
// router.get('/admin',VerifyToken, getUsers);
// router.delete('/logout', logout),
// router.get('/token', VerifyToken, (req, res)=>{
//     res.sendStatus(200)
// })

export default teamPageRouter