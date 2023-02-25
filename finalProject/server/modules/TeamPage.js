import db from '../connections/elephant_db.js';




export const team = (teamId) => {
    return db('teams')
    .join('users', 'users.id', '=','users' )
    .select("*")
    .where({team_id:teamId})
}

export const currentList = (teamId, date)=>{
  return db('task_list')
  .select('tl_id')
  .where('team_id','=', teamId)
  .andWhere('duedate', '>', date)
  .orderBy('duedate', 'desc') 
  .limit(1)
  
  
}

export const leaderBoardData = (teamId, currListId)=>{
        return db('tasks')
        .join('task_list', 'task_list.tl_id', '=','tasks.tl_id')
        .join('users', 'users.id','=', 'assignee_id')
        .select('tasks.assignee_id', 'tasks.tl_id', 'users.email').sum ('tasks.completion_time') 
        .andWhere('tasks.status','=','done')
        .andWhere('tasks.tl_id','=',currListId )
        .groupBy('tasks.assignee_id')
        .groupBy('users.email')
        .groupBy('tasks.tl_id')
        
    }

   

    