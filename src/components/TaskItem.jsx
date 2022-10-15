import React from 'react'
import classes from './TaskItem.module.css'

const TaskItem = (props) => {
  return (
	<div className={classes.Tasks__item}>
        <span className={classes.Tasks__time}>{props.time}</span>
            <div className={classes.Tasks__title}>{props.title}</div>
        <button className={classes.Tasks__complete} onClick={() => {
          props.complete(props.task)
          }}></button>
    </div>
  )
}

export default TaskItem