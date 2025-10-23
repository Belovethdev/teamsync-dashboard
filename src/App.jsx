import React, { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialTeamMembers, initialTasks } from './data/mockData';
import GlobalStyle from './styles/styled/GlobalStyle';
import theme from './styles/styled/theme';

// Import styled components
import styled from 'styled-components';
import { Container, Flex, Grid } from './styles/styled/Layout';
import { Card } from './styles/styled/Card';
import { PrimaryButton } from './styles/styled/Button';

// Import our new styled components
import StyledMemberCard from './components/styled/StyledMemberCard';
import StyledTaskList from './components/styled/StyledTaskList';
import StyledSearcherBar from './components/styled/StyledSearcherBar';
import StyledAddMemberForm from './components/styled/StyledAddMemberForm';

// Styled components for App
const AppHeader = styled.header`
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.xl} 0;
`;

const HeaderContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    background: linear-gradient(135deg, ${theme.colors.primary}, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const HeaderStats = styled(Flex)`
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`;

const StatCard = styled(Card)`
  padding: ${theme.spacing.lg};
  text-align: center;
  min-width: 120px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    flex: 1;
    min-width: 0;
  }
`;

const StatNumber = styled.span`
  display: block;
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
`;

const Dashboard = styled(Container)`
  padding: ${theme.spacing.xl} 0;
`;

const DashboardContent = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const TeamSection = styled(Card)`
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

const SectionHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  h2 {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
  }
`;

const CountBadge = styled.span`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const MembersGrid = styled(Grid)`
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

function App() {
  const [teamMembers, setTeamMembers] = useLocalStorage('teamMembers', initialTeamMembers);
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);
  const [filterValue, setFilterValue] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const handleAddMember = useCallback((newMember) => {
    setTeamMembers(prev => [...prev, newMember]);
  }, [setTeamMembers]);

  const handleDeleteMember = useCallback((memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member && confirm(`Remove ${member.name} from the team?`)) {
      setTeamMembers(prev => prev.filter(m => m.id !== memberId));
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
  }, []);

  const filteredMembers = teamMembers.filter(member =>
    (departmentFilter === 'All' || member.department === departmentFilter) &&
    (!filterValue || 
      member.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      member.role.toLowerCase().includes(filterValue.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(filterValue.toLowerCase())))
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <AppHeader>
          <HeaderContent>
            <HeaderTitle>
              <h1>🚀 TeamSync Dashboard</h1>
              <p>Styled Components Version - Complete</p>
            </HeaderTitle>
            <HeaderStats>
              <StatCard>
                <StatNumber>{teamMembers.length}</StatNumber>
                <StatLabel>Team Members</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{tasks.length}</StatNumber>
                <StatLabel>Total Tasks</StatLabel>
              </StatCard>
            </HeaderStats>
          </HeaderContent>
        </AppHeader>

        <Dashboard>
          <StyledSearcherBar 
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            onDepartmentFilter={setDepartmentFilter}
          />

          <DashboardContent>
            <TeamSection>
              <SectionHeader>
                <h2>
                  Team Members 
                  <CountBadge>{filteredMembers.length}</CountBadge>
                </h2>
                <StyledAddMemberForm onAddMember={handleAddMember} />
              </SectionHeader>
              
              <MembersGrid>
                {filteredMembers.map(member => (
                  <StyledMemberCard
                    key={member.id}
                    member={member}
                    onDeleteMember={handleDeleteMember}
                    onSendMessage={handleSendMessage}
                  />
                ))}
                
                {filteredMembers.length === 0 && (
                  <EmptyState>
                    <h3>No team members found</h3>
                    <p>Try adjusting your search criteria or add new members</p>
                  </EmptyState>
                )}
              </MembersGrid>
            </TeamSection>

            <StyledTaskList
              tasks={tasks}
              filterValue={filterValue}
              onStatusChange={handleStatusChange}
              onTaskUpdate={handleTaskUpdate}
            />
          </DashboardContent>
        </Dashboard>
      </div>
    </ThemeProvider>
  );
}

export default App;