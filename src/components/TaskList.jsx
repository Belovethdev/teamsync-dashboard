import React, { useState, useEffect, useMemo } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filterValue, onStatusChange, onTaskUpdate }) => {
  const [statusFilter, setStatusFilter] = useState('All');

  // Memoized filtered tasks for performance
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = !filterValue || 
        task.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        task.assignee.toLowerCase().includes(filterValue.toLowerCase()) ||
        task.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(filterValue.toLowerCase()));
      
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [tasks, filterValue, statusFilter]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const todo = tasks.filter(task => task.status === 'Todo').length;
    
    return { total, completed, inProgress, todo };
  }, [tasks]);

  return (
    <div className="task-list-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Team Tasks</h2>
          <div className="task-stats">
            <span className="stat total">Total: {taskStats.total}</span>
            <span className="stat completed">Done: {taskStats.completed}</span>
            <span className="stat progress">In Progress: {taskStats.inProgress}</span>
            <span className="stat todo">To Do: {taskStats.todo}</span>
          </div>
        </div>
        
        <div className="status-filters">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter-select"
          >
            <option value="All">All Status</option>
            <option value="Todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="tasks-grid">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onTaskUpdate={onTaskUpdate}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;