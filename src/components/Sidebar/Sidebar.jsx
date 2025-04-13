
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, selectGoal } from '../../store/actions/goalActions';
import { fetchTasksByGoal } from '../../store/actions/taskActions';
import TaskList from './TaskList';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { goals, selectedGoal } = useSelector((state) => state.goals);
  const { tasks } = useSelector((state) => state.tasks);
  
  // Fetch goals on component mount
  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);
  
  // Handle goal selection
  const handleGoalClick = (goal) => {
    dispatch(selectGoal(goal));
    dispatch(fetchTasksByGoal(goal._id));
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2 className="sidebar-title">GOALS</h2>
        <ul className="goal-list">
          {goals.map((goal) => (
            <li
              key={goal._id}
              className={`goal-item ${selectedGoal && selectedGoal._id === goal._id ? 'selected' : ''}`}
              style={{ borderLeftColor: goal.color }}
              onClick={() => handleGoalClick(goal)}
            >
              {goal.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h2 className="sidebar-title">TASKS</h2>
        <TaskList tasks={tasks} selectedGoal={selectedGoal} />
      </div>
    </div>
  );
};

export default Sidebar;
