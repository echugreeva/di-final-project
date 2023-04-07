import db from '../connections/elephant_db.js';



export const getTasks = (tlId)=> {
        return db('tasks')
        .select('*')
        .where({tl_id: tlId})
    }


    export const updateTaskStatus = (taskId, taskStatus) => {
        return db('tasks')
        .where({task_id: taskId})
        .update({
            status: taskStatus})
        .returning('*')
      
      }

    export const updateAssignee = (taskId, assigneeId) => {
        return db('tasks')
        .where({task_id: taskId})
        .update({
            assignee_id: assigneeId})
        .returning('*')
      
      }



