import db from '../connections/elephant_db.js';




    export const getMyTeams = (userId)=> {
        return db('teams')
        .select('*')
        .where({users: userId})
    }

    

    export const getTeamLists = (teamId)=> {
        return db('task_list')
        .select('*')
        .where({team_id: teamId})
    }

    export const addTaskList = (taskList) => {
        return db('task_list')
        .insert(taskList)
        .returning('*')
      
      }
    
     export const addTasks = (taskList) => {
        return db('tasks')
        .insert(taskList)
        .returning('*')
      
      }
    
      export const addTeam = (id, name) => {
        return db('teams')
        .insert({admin_id: id,users: id,name: name})
        .returning('*')
      
      }

      export const addUserToTeam = (admin_id, team_id, team_name, user_id) => {
        return db('teams')
        .insert({admin_id: admin_id,users: user_id,name: team_name, team_id:team_id})
        .returning('*')
      
      }
    
      export const userExistsInDB = (email) => {
        return db('users')
    .select("*")
    .where({email: email})
}
    

      export const userExistInTeam = (userId, teamId) => {
        return db('teams')
        .select("*")
        .where({users: userId})
        .andWhere({team_id: teamId})
    }

  export const members = (tlid) => {
    return db('teams')
    .join('task_list', 'teams.team_id', '=','task_list.team_id' )
    .select("teams.users")
    .where('task_list.tl_id','=', tlid)
}

export const taskIds = (tlid) => {
  return db('tasks')
  .select("task_id")
  .where('tl_id','=', tlid)
}