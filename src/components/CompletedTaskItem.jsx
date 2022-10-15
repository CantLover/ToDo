import React from 'react';
import classes from './CompletedTaskItem.module.css';

const TaskItem = props => {
	return (
		<div className={classes.Tasks__item}>
			<span className={classes.Tasks__time}>{props.time}</span>
			<div className={classes.Tasks__title}>{props.title}</div>
			<button
				className={classes.Tasks__complete}
				onClick={() => props.remove(props.task)}
			>x</button>
		</div>
	);
};

export default TaskItem;
