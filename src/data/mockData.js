export const initialTeamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    email: 'sarah.j@company.com',
    avatar: '👩‍💻',
    department: 'Engineering',
    joinDate: '2023-01-15',
    skills: ['React', 'TypeScript', 'CSS']
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Product Manager',
    email: 'mike.chen@company.com',
    avatar: '👨‍💼',
    department: 'Product',
    joinDate: '2022-08-20',
    skills: ['Agile', 'Figma', 'Analytics']
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'UX Designer',
    email: 'emily.d@company.com',
    avatar: '👩‍🎨',
    department: 'Design',
    joinDate: '2023-03-10',
    skills: ['Figma', 'User Research', 'Prototyping']
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    role: 'Backend Developer',
    email: 'alex.r@company.com',
    avatar: '👨‍💻',
    department: 'Engineering',
    joinDate: '2022-11-05',
    skills: ['Node.js', 'Python', 'AWS']
  }
];

export const initialTasks = [
  {
    id: 1,
    title: 'Implement user authentication system',
    assignee: 'Sarah Johnson',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-02-15',
    description: 'Create secure login and registration flow',
    tags: ['Authentication', 'Security']
  },
  {
    id: 2,
    title: 'Design new dashboard layout',
    assignee: 'Emily Davis',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2024-02-10',
    description: 'Redesign the main dashboard for better UX',
    tags: ['UI/UX', 'Design']
  },
  {
    id: 3,
    title: 'Product requirements document',
    assignee: 'Mike Chen',
    status: 'Todo',
    priority: 'High',
    dueDate: '2024-02-20',
    description: 'Draft PRD for Q2 features',
    tags: ['Documentation', 'Planning']
  },
  {
    id: 4,
    title: 'API optimization',
    assignee: 'Alex Rodriguez',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-02-25',
    description: 'Optimize database queries and API responses',
    tags: ['Backend', 'Performance']
  }
];