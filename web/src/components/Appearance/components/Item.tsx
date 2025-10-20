import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background: linear-gradient(
    145deg,
    rgba(220, 38, 38, 0.15) 0%,
    rgba(185, 28, 28, 0.12) 100%
  );
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(220, 38, 38, 0.2) 0%,
      rgba(185, 28, 28, 0.17) 100%
    );
    border-color: rgba(220, 38, 38, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2);
  }

  /* Red glow line effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(220, 38, 38, 0.3) 50%,
      transparent 100%
    );
    border-radius: 12px 12px 0 0;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #f8fafc;
  line-height: 1.4;
  margin-bottom: 12px;
  display: block;
`;

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > div {
    margin: 0;
  }
`;

const Item: React.FC<ItemProps> = ({ children, title }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Inputs>{children}</Inputs>
    </Container>
  );
};

export default Item;
