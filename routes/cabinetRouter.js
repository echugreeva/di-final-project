import express from "express";
import {  _getMyTeams, _getTeamLists,_addTaskList, _addTasks,_addTeam, _addUserToTeam,_members, _taskIds} from "../controllers/Cabinet.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";


const cabinetRouter = express.Router();
cabinetRouter.get('/myteams/:uid', _getMyTeams);
cabinetRouter.get('/teamlists/:tid', _getTeamLists);
cabinetRouter.post('/addteam/', _addTeam);
cabinetRouter.post('/adduserteam/',_addUserToTeam);
cabinetRouter.post('/addlist/', _addTaskList);
cabinetRouter.post('/addtasks/:tlid', _addTasks);
cabinetRouter.get('/getmembers/:tlid', _members);
cabinetRouter.get('/gettaskIds/:tlid', _taskIds);

// router.get('/teams/:tid', _team);
// router.get('/teams/:tlid', _team);
// router.get('/tasks/:tid', _getTasks);
// router.get('/leaderboard/:teamid', _leaderBoardData);
// router.post('/task/status', _updateTaskStatus);
// router.post('/task/assignee', _updateAssignee);







// router.get('/currentlist/:tid',_currentList)




export default cabinetRouter