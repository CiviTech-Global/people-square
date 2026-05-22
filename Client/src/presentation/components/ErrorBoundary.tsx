import { Component, type ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--spacing-2xl);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-dark);
  margin: 0 0 var(--spacing-md);
`;

const Message = styled.p`
  color: var(--color-gray);
  margin: 0 0 var(--spacing-xl);
  max-width: 400px;
`;

const RetryBtn = styled.button`
  padding: 12px 24px;
  border-radius: var(--radius-full);
  border: none;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }
`;

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Title>Something went wrong</Title>
          <Message>An unexpected error occurred. Please try refreshing the page.</Message>
          <RetryBtn onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}>
            Try Again
          </RetryBtn>
        </Container>
      );
    }
    return this.props.children;
  }
}
