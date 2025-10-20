import React, { useState } from 'react';
import { Calendar, Flag, User, Edit3, Save, X } from 'lucide-react';

const TaskItem = ({ task, onStatusChange, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
  };

  const handleSave = () => {
    onTaskUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: '#ef4444',
      Medium: '#f59e0b',
      Low: '#10b981'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      Completed: '#10b981',
      'In Progress': '#3b82f6',
      Todo: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div className="task-item">
      <div className="task-header">
        {isEditing ? (
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
            className="task-title-input"
          />
        ) : (
          <h3 className="task-title">{task.title}</h3>
        )}
        
        <div className="task-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-icon btn-save">
                <Save size={16} />
              </button>
              <button onClick={handleCancel} className="btn-icon btn-cancel">
                <X size={16} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="btn-icon btn-edit"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
          className="task-description-input"
          rows="3"
        />
      ) : (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="meta-item">
          <User size={16} />
          <span>{task.assignee}</span>
        </div>
        
        <div className="meta-item">
          <Calendar size={16} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        
        <div className="meta-item">
          <Flag size={16} />
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="task-tags">
        {task.tags.map((tag, index) => (
          <span key={index} className="task-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="task-footer">
        <select 
          value={task.status} 
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
          style={{ borderColor: getStatusColor(task.status) }}
        >
          <option value="Todo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <div 
          className="status-indicator"
          style={{ backgroundColor: getStatusColor(task.status) }}
        />
      </div>
    </div>
  );
};

export default TaskItem;