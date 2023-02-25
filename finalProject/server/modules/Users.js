import db from '../connections/elephant_db.js';


export const register = (user) => {
    return db('users')
    .insert(user)
    .returning('*')
  
  }


export const login = (email) => {
    return db('users')
    .select("*")
    .where({email: email})
}

// export const userExistInTeam = (userId, teamId) => {
//   return db('teams')
//   .select("*")
//   .where({users: userId})
//   .andWhere({team_id: teamId})
// }


// export const team = (teamId) => {
//     return db('teams')
//     .join('users', 'users.id', '=','users' )
//     .select("*")
//     .where({team_id:teamId})
// }

// export const getTasks = (tlId)=> {
//         return db('tasks')
//         .select('*')
//         .where({tl_id: tlId})
//     }

// export const leaderBoardData = (teamId, currListId)=>{
//         return db('tasks')
//         .join('task_list', 'task_list.tl_id', '=','tasks.tl_id')
//         .join('users', 'users.id','=', 'assignee_id')
//         .select('tasks.assignee_id', 'tasks.tl_id', 'users.email').sum ('tasks.completion_time') 
//         .andWhere('tasks.status','=','done')
//         .andWhere('tasks.tl_id','=',currListId )
//         .groupBy('tasks.assignee_id')
//         .groupBy('users.email')
//         .groupBy('tasks.tl_id')
        
//     }

//     export const updateTaskStatus = (taskId, taskStatus) => {
//         return db('tasks')
//         .where({task_id: taskId})
//         .update({
//             status: taskStatus})
//         .returning('*')
      
//       }

    // export const updateAssignee = (taskId, assigneeId) => {
    //     return db('tasks')
    //     .where({task_id: taskId})
    //     .update({
    //         assignee_id: assigneeId})
    //     .returning('*')
      
    //   }


    // export const getMyTeams = (userId)=> {
    //     return db('teams')
    //     .select('*')
    //     .where({users: userId})
    // }

    

    // export const getTeamLists = (teamId)=> {
    //     return db('task_list')
    //     .select('*')
    //     .where({team_id: teamId})
    // }

    // export const addTaskList = (taskList) => {
    //     return db('task_list')
    //     .insert(taskList)
    //     .returning('*')
      
    //   }
    
    //  export const addTasks = (taskList) => {
    //     return db('tasks')
    //     .insert(taskList)
    //     .returning('*')
      
    //   }
    
    //   export const addTeam = (id, name) => {
    //     return db('teams')
    //     .insert({admin_id: id,users: id,name: name})
    //     .returning('*')
      
    //   }

    //   export const addUserToTeam = (admin_id, team_id, team_name, user_id) => {
    //     return db('teams')
    //     .insert({admin_id: admin_id,users: user_id,name: team_name, team_id:team_id})
    //     .returning('*')
      
    //   }
    
 


//     export const currentList = (teamId, date)=>{
//       return db('task_list')
//       .select('tl_id')
//       .where('team_id','=', teamId)
//       .andWhere('duedate', '>', date)
//       .orderBy('duedate', 'desc') 
//       .limit(1)
      
      
//   }

//   export const members = (tlid) => {
//     return db('teams')
//     .join('task_list', 'teams.team_id', '=','task_list.team_id' )
//     .select("teams.users")
//     .where('task_list.tl_id','=', tlid)
// }

// export const taskIds = (tlid) => {
//   return db('tasks')
//   .select("task_id")
//   .where('tl_id','=', tlid)
// }