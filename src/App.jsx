import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import MemberCard from './components/MemberCard';
import TaskList from './components/TaskList';
import SearcherBar from './components/SearcherBar';
import AddMemberForm from './components/AddMemberForm';
import { initialTeamMembers, initialTasks } from './data/mockData';
import { Send } from 'lucide-react';
import './styles/App.css';

function App() {
  // State with localStorage persistence
  const [teamMembers, setTeamMembers] = useLocalStorage('teamMembers', initialTeamMembers);
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);
  const [filterValue, setFilterValue] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Memoized event handlers
  const handleAddMember = useCallback((newMember) => {
    setTeamMembers(prev => [...prev, newMember]);
  }, [setTeamMembers]);

  const handleDeleteMember = useCallback((memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member && confirm(`Remove ${member.name} from the team?`)) {
      setTeamMembers(prev => prev.filter(m => m.id !== memberId));
      // Remove tasks assigned to this member
      setTasks(prev => prev.filter(task => task.assignee !== member.name));
    }
  }, [teamMembers, setTeamMembers, setTasks]);

  const handleStatusChange = useCallback((taskId, newStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  }, [setTasks]);

  const handleTaskUpdate = useCallback((taskId, updatedTask) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  }, [setTasks]);

  const handleSendMessage = useCallback((member) => {
    alert(`Opening email client to send message to ${member.name} at ${member.email}`);
    // In a real app, this would open mailto: link or integration
  }, []);

  // Filter team members
  const filteredMembers = teamMembers.filter(member =>
    (departmentFilter === 'All' || member.department === departmentFilter) &&
    (!filterValue || 
      member.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      member.role.toLowerCase().includes(filterValue.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(filterValue.toLowerCase())))
  );

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🚀 TeamSync Dashboard</h1>
            <p>Streamline your team management and task tracking</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{teamMembers.length}</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <SearcherBar 
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          onDepartmentFilter={setDepartmentFilter}
        />

        <div className="dashboard-content">
          <section className="team-section">
            <div className="section-header">
              <h2>
                Team Members 
                <span className="count-badge">{filteredMembers.length}</span>
              </h2>
              <AddMemberForm onAddMember={handleAddMember} />
            </div>
            
            <div className="members-grid">
              {filteredMembers.map(member => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onDeleteMember={handleDeleteMember}
                  onSendMessage={handleSendMessage}
                />
              ))}
              
              {filteredMembers.length === 0 && (
                <div className="empty-state">
                  <h3>No team members found</h3>
                  <p>Try adjusting your search criteria or add new members</p>
                </div>
              )}
            </div>
          </section>

          <TaskList
            tasks={tasks}
            filterValue={filterValue}
            onStatusChange={handleStatusChange}
            onTaskUpdate={handleTaskUpdate}
          />
        </div>
      </main>
    </div>
  );
}

export default App;