import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import CreateModal from './components/modals/CreateModal';
import TasksList from './components/TasksList';
import ComplitedTasksList from './components/CompletedTasksList';

function App() {
	const [tasks, setTasks] = useState([]);
	const [tasksCompleted, setTasksCompleted] = useState([]);
	const [task, setTask] = useState({ time: '00:00', title: '' });
	const [modalActive, setModalActive] = useState(false);

	const addNewTask = e => {
		e.preventDefault();
		setTasks([...tasks, { ...task, id: task.title }]);
		setModalActive(false);
		setTask({ time: '00:00', title: '' });
	};

	const sortedTasks = useMemo(() => {
		return [...tasks].sort((a, b) => a['time'].localeCompare(b['time']));
	}, [tasks]);
	const sortedCompletedTasks = useMemo(() => {
		return [...tasksCompleted].sort((a, b) =>
			a['time'].localeCompare(b['time'])
		);
	}, [tasksCompleted]);

	const completePost = task => {
		setTasks(tasks.filter(t => t.title !== task.title));
		setTasksCompleted([
			...tasksCompleted,
			{ time: task.time, title: task.title },
		]);
	};

	const removeCompletedPost = completedTask => {
		setTasksCompleted(
			tasksCompleted.filter(t => t.title !== completedTask.title)
		);
	};

	//Time
	const [time, setTime] = useState(new Date().toLocaleTimeString());
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='App'>
			<div className='Body'>
				<div className='Title'>
					<h1>TODO</h1>
				</div>
				<div className='WrapperContent'>
					<div className='Bottoms'>
						<div className='Bottoms__time'>{time}</div>
						<button
							className='Bottoms__create'
							onClick={() => setModalActive(true)}
						>
							+
						</button>
					</div>

					{tasks.length ? (
						<TasksList tasksList={sortedTasks} complete={completePost} />
					) : (
						<div className='Empty'>Empty</div>
					)}

					<hr className='MainLine' />

					{tasksCompleted.length ? (
						<ComplitedTasksList
							tasksList={sortedCompletedTasks}
							remove={removeCompletedPost}
						/>
					) : (
						<div className='EmptyCompleted'>No completed tasks</div>
					)}
				</div>
			</div>

			<CreateModal active={modalActive} setActive={setModalActive}>
				<div className='ModalBody'>
					<form>
						<div className='ModalBody__inputs'>
							<input
								type='time'
								value={task.time}
								placeholder='Time'
								className='ModalBody__time'
								onChange={e => setTask({ ...task, time: e.target.value })}
							/>
							<input
								autofocus
								type='text'
								value={task.title}
								placeholder='Task'
								className='ModalBody__title'
								onChange={e => setTask({ ...task, title: e.target.value })}
							/>
						</div>
						<button className='ModalBody__button' onClick={addNewTask}>
							CREATE
						</button>
					</form>
				</div>
			</CreateModal>
		</div>
	);
}

export default App;
