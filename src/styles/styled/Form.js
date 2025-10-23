import styled, { css } from 'styled-components';
import { theme } from './theme';

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  label {
    display: block;
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.textPrimary};
    font-weight: ${theme.typography.fontWeight.medium};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const Input = styled.input`
  width: 100%;
  background: ${theme.colors.surfaceLight};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.base};
  transition: ${theme.transitions.default};
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }

  /* Mobile responsive */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    font-size: 16px; /* Prevent zoom on iOS */
  }
`;

export const Select = styled.select`
  width: 100%;
  background: ${theme.colors.surfaceLight};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.base};
  transition: ${theme.transitions.default};
  min-height: 44px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  option {
    background: ${theme.colors.surface};
    color: ${theme.colors.textPrimary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  background: ${theme.colors.surfaceLight};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.fontSize.base};
  transition: ${theme.transitions.default};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;