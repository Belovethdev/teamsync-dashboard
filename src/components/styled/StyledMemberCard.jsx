import React, { useState } from 'react';
import { Trash2, Mail, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import styled, { css } from 'styled-components';
import { Flex } from '../../styles/styled/Layout'; // Remove Card import from here
import { PrimaryButton, DangerButton, GhostButton } from '../../styles/styled/Button';
import { theme } from '../../styles/styled/theme';
// import { Card } from '../../styles/styled/Card';

// Create Card component locally
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

// Rest of the StyledMemberCard component remains the same...
const MemberCardContainer = styled(Card)`
  padding: ${theme.spacing.lg};
  transition: ${theme.transitions.default};
  border-left: 4px solid ${props => {
    switch (props.$department) {
      case 'Engineering': return theme.colors.engineering;
      case 'Design': return theme.colors.design;
      case 'Product': return theme.colors.product;
      case 'Marketing': return theme.colors.marketing;
      case 'Sales': return theme.colors.sales;
      default: return theme.colors.primary;
    }
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const MemberHeader = styled(Flex)`
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const MemberAvatar = styled.div`
  font-size: 2.5rem;
  flex-shrink: 0;
`;

const MemberBasicInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MemberName = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.xs};
  line-height: 1.2;
`;

const MemberRole = styled.p`
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.base};
`;

const DepartmentBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.$department) {
      case 'Engineering': return theme.colors.engineering;
      case 'Design': return theme.colors.design;
      case 'Product': return theme.colors.product;
      case 'Marketing': return theme.colors.marketing;
      case 'Sales': return theme.colors.sales;
      default: return theme.colors.secondary;
    }
  }};
  color: white;
`;

const MemberContact = styled(Flex)`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const MemberMeta = styled(Flex)`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const MemberDetails = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SkillsSection = styled.div`
  h4 {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.textSecondary};
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const SkillsList = styled(Flex)`
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const SkillTag = styled.span`
  background: ${theme.colors.surfaceLight};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.border};
`;

const MemberActions = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

const ActionButtons = styled(Flex)`
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: space-between;
  }
`;

const StyledMemberCard = ({ member, onDeleteMember, onSendMessage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      onDeleteMember(member.id);
    }
  };

  const handleSendMessage = () => {
    onSendMessage(member);
  };

  return (
    <MemberCardContainer 
      hoverable 
      $department={member.department}
    >
      <MemberHeader>
        <MemberAvatar>{member.avatar}</MemberAvatar>
        <MemberBasicInfo>
          <MemberName>{member.name}</MemberName>
          <MemberRole>{member.role}</MemberRole>
          <DepartmentBadge $department={member.department}>
            {member.department}
          </DepartmentBadge>
        </MemberBasicInfo>
      </MemberHeader>

      <MemberContact>
        <Mail size={16} />
        <span>{member.email}</span>
      </MemberContact>

      <MemberMeta>
        <Calendar size={16} />
        <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
      </MemberMeta>

      {isExpanded && (
        <MemberDetails>
          <SkillsSection>
            <h4>Skills</h4>
            <SkillsList>
              {member.skills.map((skill, index) => (
                <SkillTag key={index}>
                  {skill}
                </SkillTag>
              ))}
            </SkillsList>
          </SkillsSection>
        </MemberDetails>
      )}

      <MemberActions>
        <GhostButton
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          mobileFull
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show More
            </>
          )}
        </GhostButton>
        
        <ActionButtons>
          <PrimaryButton
            onClick={handleSendMessage}
            icon
            size="sm"
            title="Send Message"
            aria-label={`Send message to ${member.name}`}
          >
            <Mail size={16} />
            <span className="mobile-only">Message</span>
          </PrimaryButton>
          
          <DangerButton
            onClick={handleDelete}
            icon
            size="sm"
            title="Remove Member"
            aria-label={`Remove ${member.name} from team`}
          >
            <Trash2 size={16} />
            <span className="mobile-only">Remove</span>
          </DangerButton>
        </ActionButtons>
      </MemberActions>
    </MemberCardContainer>
  );
};

export default StyledMemberCard;