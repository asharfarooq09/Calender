
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../store/actions/eventActions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, name: task.name, color: task.color },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const startTime = new Date(dropResult.start);
        const endTime = new Date(dropResult.end);

        const eventData = {
          title: item.name,
          category: getCategoryFromColor(item.color),
          start: startTime,
          end: endTime,
          color: item.color,
        };

        dispatch(addEvent(eventData));
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getCategoryFromColor = (color) => {
    const colorMap = {
      '#FF5252': 'exercise',
      '#448AFF': 'work',
      '#66BB6A': 'relax',
      '#FFA726': 'social',
    };
    return colorMap[color] || 'work';
  };

  return (
    <li
      ref={drag}
      className="task-item"
      style={{
        borderLeftColor: task.color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        padding: '8px 12px',
        marginBottom: '8px',
        backgroundColor: isDragging ? '#f5f5f5' : 'white',
        boxShadow: isDragging ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.2s ease',
        borderRadius: '4px',
        borderLeft: `4px solid ${task.color}`
      }}
    >
      {task.name}
      {isDragging && (
        <div 
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 1000,
            padding: '8px 12px',
            backgroundColor: task.color,
            color: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            opacity: 0.8,
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {task.name}
        </div>
      )}
    </li>
  );
};

const TaskList = ({ tasks, selectedGoal }) => {
  if (!selectedGoal) {
    return <div className="no-goal-selected">Select a goal to see tasks</div>;
  }

  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks for this goal</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
