import express from "express";
import { _getTasks, _updateTaskStatus, _updateAssignee} from "../controllers/TaskData.js";



const router = express.Router();

router.get('/tasks/:tlid', _getTasks);
router.post('/task/status', _updateTaskStatus);
router.post('/task/assignee', _updateAssignee);




// router.get('/teams/:tid', _team);
// router.get('/teams/:tlid', _team);



// router.get('/myteams/:uid', _getMyTeams);
// router.get('/teamlists/:tid', _getTeamLists);



// router.get('/getmembers/:tlid', _members);
// router.get('/gettaskIds/:tlid', _taskIds);


export default router