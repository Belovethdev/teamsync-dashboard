import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Card, Flex, Grid } from '../../styles/styled/Layout';
import { Select } from '../../styles/styled/Form';
import StyledTaskItem from './StyledTaskItem';
import { theme } from '../../styles/styled/theme';

const TaskListSection = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const SectionHeader = styled(Flex)`
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SectionTitle = styled.div`
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const TaskStats = styled(Flex)`
  gap: ${theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
    gap: ${theme.spacing.sm};
  }
`;

const Stat = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  
  ${props => props.type === 'total' && `
    background: ${theme.colors.engineering};
    color: #bfdbfe;
  `}
  
  ${props => props.type === 'completed' && `
    background: ${theme.colors.success};
    color: white;
  `}
  
  ${props => props.type === 'progress' && `
    background: ${theme.colors.warning};
    color: white;
  `}
  
  ${props => props.type === 'todo' && `
    background: ${theme.colors.surfaceLight};
    color: ${theme.colors.textPrimary};
  `}
`;

const StatusFilters = styled(Flex)`
  gap: ${theme.spacing.sm};
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StatusFilterSelect = styled(Select)`
  min-width: 140px;
`;

const TasksGrid = styled(Grid)`
  gap: ${theme.spacing.lg};
`;

const EmptyState = styled(Card)`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.textSecondary};

  h3 {
    color: ${theme.colors.textPrimary};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const StyledTaskList = ({ tasks, filterValue, onStatusChange, onTaskUpdate }) => {
  const [statusFilter, setStatusFilter] = useState('All');

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
    <TaskListSection>
      <SectionHeader>
        <SectionTitle>
          <h2>Team Tasks</h2>
          <TaskStats>
            <Stat type="total">Total: {taskStats.total}</Stat>
            <Stat type="completed">Done: {taskStats.completed}</Stat>
            <Stat type="progress">In Progress: {taskStats.inProgress}</Stat>
            <Stat type="todo">To Do: {taskStats.todo}</Stat>
          </TaskStats>
        </SectionTitle>
        
        <StatusFilters>
          <StatusFilterSelect 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </StatusFilterSelect>
        </StatusFilters>
      </SectionHeader>

      <TasksGrid>
        {filteredTasks.map(task => (
          <StyledTaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onTaskUpdate={onTaskUpdate}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <EmptyState>
            <h3>No tasks found</h3>
            <p>Try adjusting your search or filters</p>
          </EmptyState>
        )}
      </TasksGrid>
    </TaskListSection>
  );
};

export default StyledTaskList;