import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from '../../styles/styled/Button';
import { FormGroup, Input, Select, FormGrid, FormActions } from '../../styles/styled/Form';
import { Card } from '../../styles/styled/Card';
import { theme } from '../../styles/styled/theme';

const AddMemberSection = styled.div`
  position: relative;
`;

const ToggleFormButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm};
    align-items: flex-start;
    padding-top: ${theme.spacing.xl};
  }
`;

const FormContainer = styled(Card)`
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows['2xl']};

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 95vh;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const FormTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.surfaceLight};
    color: ${theme.colors.textPrimary};
  }
`;

const AvatarOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.xs};
  }
`;

const AvatarOption = styled.label`
  cursor: pointer;
  display: block;
`;

const AvatarInput = styled.input`
  display: none;
`;

const AvatarPreview = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: ${theme.spacing.md};
  border: 2px solid transparent;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surfaceLight};
  transition: ${theme.transitions.default};
  cursor: pointer;

  ${AvatarInput}:checked + & {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primary};
    color: white;
  }

  &:hover {
    border-color: ${theme.colors.primaryLight};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm};
    font-size: 1.25rem;
  }
`;

const SkillsInputGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SkillInput = styled(Input)`
  flex: 1;
`;

const SkillsList = styled.div`
  display: flex;
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
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const RemoveSkillButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 0;
  border-radius: ${theme.borderRadius.xs};
  display: flex;
  align-items: center;
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.error};
  }
`;

const StyledAddMemberForm = ({ onAddMember }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    department: 'Engineering',
    avatar: '👨‍💼',
    skills: []
  });
  const [currentSkill, setCurrentSkill] = useState('');

  const avatarOptions = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🔬', '👩‍🔬'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.role && formData.email) {
      onAddMember({
        ...formData,
        id: Date.now(),
        joinDate: new Date().toISOString().split('T')[0]
      });
      setFormData({
        name: '',
        role: '',
        email: '',
        department: 'Engineering',
        avatar: '👨‍💼',
        skills: []
      });
      setIsFormVisible(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <AddMemberSection>
      <ToggleFormButton
        onClick={() => setIsFormVisible(!isFormVisible)}
        mobileFull
      >
        <Plus size={20} />
        Add Team Member
      </ToggleFormButton>

      {isFormVisible && (
        <FormOverlay>
          <FormContainer>
            <FormHeader>
              <FormTitle>Add New Team Member</FormTitle>
              <CloseButton 
                onClick={() => setIsFormVisible(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </CloseButton>
            </FormHeader>

            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <label htmlFor="name">Full Name *</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="role">Role *</label>
                  <Input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Frontend Developer"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email *</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="email@company.com"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="department">Department</label>
                  <Select 
                    id="department"
                    name="department" 
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <label>Avatar</label>
                <AvatarOptions>
                  {avatarOptions.map(avatar => (
                    <AvatarOption key={avatar}>
                      <AvatarInput
                        type="radio"
                        name="avatar"
                        value={avatar}
                        checked={formData.avatar === avatar}
                        onChange={handleInputChange}
                      />
                      <AvatarPreview>{avatar}</AvatarPreview>
                    </AvatarOption>
                  ))}
                </AvatarOptions>
              </FormGroup>

              <FormGroup>
                <label htmlFor="skills">Skills</label>
                <SkillsInputGroup>
                  <SkillInput
                    type="text"
                    id="skills"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill and press Enter"
                  />
                  <SecondaryButton 
                    type="button"
                    onClick={handleAddSkill}
                  >
                    Add
                  </SecondaryButton>
                </SkillsInputGroup>
                <SkillsList>
                  {formData.skills.map((skill, index) => (
                    <SkillTag key={index}>
                      {skill}
                      <RemoveSkillButton 
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        aria-label={`Remove ${skill} skill`}
                      >
                        <X size={14} />
                      </RemoveSkillButton>
                    </SkillTag>
                  ))}
                </SkillsList>
              </FormGroup>

              <FormActions>
                <SecondaryButton 
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  mobileFull
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton 
                  type="submit"
                  disabled={!formData.name || !formData.role || !formData.email}
                  mobileFull
                >
                  Add Member
                </PrimaryButton>
              </FormActions>
            </form>
          </FormContainer>
        </FormOverlay>
      )}
    </AddMemberSection>
  );
};

export default StyledAddMemberForm;