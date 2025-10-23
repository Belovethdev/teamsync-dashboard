import styled, { css } from 'styled-components';
import { theme } from './theme';

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${props => {
    switch (props.size) {
      case 'sm': return `${theme.spacing.sm} ${theme.spacing.md}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return theme.typography.fontSize.sm;
      case 'lg': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.base;
    }
  }};
  text-decoration: none;
  cursor: pointer;
  transition: ${theme.transitions.default};
  min-height: 44px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  ${props => props.variant === 'primary' && css`
    background: ${theme.colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background: ${theme.colors.primaryDark};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.lg};
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background: ${theme.colors.surfaceLight};
    color: ${theme.colors.textPrimary};
    border: 1px solid ${theme.colors.border};

    &:hover:not(:disabled) {
      background: ${theme.colors.surface};
      border-color: ${theme.colors.primary};
    }
  `}

  ${props => props.variant === 'danger' && css`
    background: ${theme.colors.error};
    color: white;

    &:hover:not(:disabled) {
      background: #dc2626;
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'success' && css`
    background: ${theme.colors.success};
    color: white;

    &:hover:not(:disabled) {
      background: #0da271;
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'ghost' && css`
    background: transparent;
    color: ${theme.colors.textSecondary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceLight};
      color: ${theme.colors.textPrimary};
    }
  `}

  /* Icon button variant */
  ${props => props.icon && css`
    padding: ${theme.spacing.sm};
    min-width: 44px;
    min-height: 44px;
  `}

  /* Mobile responsive */
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 44px;
    
    ${props => props.mobileFull && css`
      width: 100%;
    `}
  }
`;

export const StyledButton = styled.button`${buttonStyles}`;
export const StyledLinkButton = styled.a`${buttonStyles}`;

// Specific button components
export const PrimaryButton = styled(StyledButton).attrs({ variant: 'primary' })``;
export const SecondaryButton = styled(StyledButton).attrs({ variant: 'secondary' })``;
export const DangerButton = styled(StyledButton).attrs({ variant: 'danger' })``;
export const SuccessButton = styled(StyledButton).attrs({ variant: 'success' })``;
export const GhostButton = styled(StyledButton).attrs({ variant: 'ghost' })``;