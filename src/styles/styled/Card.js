import styled, { css } from 'styled-components';
import { theme } from './theme';

export const Card = styled.div`
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

  ${props => props.variant === 'light' && css`
    background: ${theme.colors.surfaceLight};
  `}

  ${props => props.padding === 'sm' && css`
    padding: ${theme.spacing.md};
  `}

  ${props => props.padding === 'lg' && css`
    padding: ${theme.spacing.xl};
  `}

  /* Mobile responsive */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const CardBody = styled.div`
  /* Card body content */
`;

export const CardFooter = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;