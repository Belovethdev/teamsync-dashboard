import React, { useState } from 'react';
import { Calendar, Flag, User, Edit3, Save, X } from 'lucide-react';
import styled, { css } from 'styled-components';
import { Flex } from '../../styles/styled/Layout'; // Remove Card import from here
import { PrimaryButton, SecondaryButton, GhostButton } from '../../styles/styled/Button';
import { Input, TextArea } from '../../styles/styled/Form';
import { theme } from '../../styles/styled/theme';

// Create Card component locally since it's not exported from Layout
const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: ${theme.transitions.default};
  
  ${props => props.hoverable && css`
    &:hover {
      transform: translateY(-2px);
      border-color: ${theme.colors.primary};
      box-shadow: ${theme.shadows.xl};
    }
  `}
`;

const TaskItemContainer = styled(Card)`
  padding: ${theme.spacing.lg};
  transition: ${theme.transitions.default};
  border-left: 3px solid ${props => {
    switch (props.$priority) {
      case 'High': return theme.colors.error;
      case 'Medium': return theme.colors.warning;
      case 'Low': return theme.colors.success;
      default: return theme.colors.secondary;
    }
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const TaskHeader = styled(Flex)`
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;

const TaskTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  line-height: 1.4;
  flex: 1;
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

const TaskTitleInput = styled(Input)`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;
`;

const TaskDescription = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;
`;

const TaskDescriptionInput = styled(TextArea)`
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.base};
`;

const TaskMeta = styled(Flex)`
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.md};
  }
`;

const MetaItem = styled(Flex)`
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const PriorityBadge = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  color: white;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.$priority) {
      case 'High': return theme.colors.error;
      case 'Medium': return theme.colors.warning;
      case 'Low': return theme.colors.success;
      default: return theme.colors.secondary;
    }
  }};
`;

const TaskTags = styled(Flex)`
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const TaskTag = styled.span`
  background: ${theme.colors.surfaceLight};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.border};
`;

const TaskFooter = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StatusSelect = styled.select`
  background: ${theme.colors.surfaceLight};
  border: 1px solid ${props => {
    switch (props.value) {
      case 'Completed': return theme.colors.success;
      case 'In Progress': return theme.colors.primary;
      case 'Todo': return theme.colors.secondary;
      default: return theme.colors.border;
    }
  }};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: ${theme.transitions.default};
  min-height: 44px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
`;

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.$status) {
      case 'Completed': return theme.colors.success;
      case 'In Progress': return theme.colors.primary;
      case 'Todo': return theme.colors.secondary;
      default: return theme.colors.border;
    }
  }};
`;

const TaskActions = styled(Flex)`
  gap: ${theme.spacing.sm};
`;

const StyledTaskItem = ({ task, onStatusChange, onTaskUpdate }) => {
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

  return (
    <TaskItemContainer $priority={task.priority} hoverable>
      <TaskHeader>
        {isEditing ? (
          <TaskTitleInput
            value={editedTask.title}
            onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
            placeholder="Task title"
          />
        ) : (
          <TaskTitle>{task.title}</TaskTitle>
        )}
        
        <TaskActions>
          {isEditing ? (
            <>
              <PrimaryButton onClick={handleSave} icon size="sm">
                <Save size={16} />
              </PrimaryButton>
              <SecondaryButton onClick={handleCancel} icon size="sm">
                <X size={16} />
              </SecondaryButton>
            </>
          ) : (
            <GhostButton 
              onClick={() => setIsEditing(true)}
              icon
              size="sm"
              title="Edit task"
            >
              <Edit3 size={16} />
            </GhostButton>
          )}
        </TaskActions>
      </TaskHeader>

      {isEditing ? (
        <TaskDescriptionInput
          value={editedTask.description}
          onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
          placeholder="Task description"
          rows="3"
        />
      ) : (
        <TaskDescription>{task.description}</TaskDescription>
      )}

      <TaskMeta>
        <MetaItem>
          <User size={16} />
          <span>{task.assignee}</span>
        </MetaItem>
        
        <MetaItem>
          <Calendar size={16} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </MetaItem>
        
        <MetaItem>
          <Flag size={16} />
          <PriorityBadge $priority={task.priority}>
            {task.priority}
          </PriorityBadge>
        </MetaItem>
      </TaskMeta>

      <TaskTags>
        {task.tags.map((tag, index) => (
          <TaskTag key={index}>
            {tag}
          </TaskTag>
        ))}
      </TaskTags>

      <TaskFooter>
        <StatusSelect 
          value={task.status} 
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="Todo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </StatusSelect>
        
        <StatusIndicator $status={task.status} />
      </TaskFooter>
    </TaskItemContainer>
  );
};

export default StyledTaskItem;