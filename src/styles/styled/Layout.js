import styled, { css } from 'styled-components';
import { theme } from './theme';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  ${props => props.size === 'sm' && css`
    max-width: 800px;
  `}

  ${props => props.size === 'lg' && css`
    max-width: 1400px;
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.md};
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: ${props => props.gap || theme.spacing.md};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  
  ${props => props.direction === 'column' && css`
    flex-direction: column;
  `}

  ${props => props.wrap && css`
    flex-wrap: wrap;
  `}

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${props => props.mobileColumn && css`
      flex-direction: column;
    `}
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: ${props => props.gap || theme.spacing.lg};
  
  ${props => props.columns && css`
    grid-template-columns: ${props.columns};
  `}

  ${props => props.autoFit && css`
    grid-template-columns: repeat(auto-fit, minmax(${props.minWidth || '250px'}, 1fr));
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.md};
    
    ${props => props.mobileSingle && css`
      grid-template-columns: 1fr;
    `}
  }
`;

export const Section = styled.section`
  padding: ${theme.spacing.xxl} 0;

  ${props => props.padding === 'sm' && css`
    padding: ${theme.spacing.xl} 0;
  `}

  ${props => props.padding === 'lg' && css`
    padding: ${theme.spacing.xxl} 0;
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

// Add Card export here since it's used in multiple components
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