import { useState, useEffect, useRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
}

interface HeaderProps {
  active: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
  
  & + & {
    margin-top: ${(props: any) => props.theme.spacing?.md || '16px'};
  }
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  min-height: 48px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${(props: any) => props.theme.spacing?.md || '16px'} ${(props: any) => props.theme.spacing?.lg || '24px'};
  border-radius: ${(props: any) => props.theme.borderRadius?.lg || '12px'};

  /* Red gradient background */
  background: ${({ active }: HeaderProps) =>
    active
      ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.35) 0%, rgba(185, 28, 28, 0.3) 100%)'
      : 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.15) 100%)'
  };

  /* Red border */
  border: 1px solid ${({ active }: HeaderProps) =>
    active
      ? 'rgba(220, 38, 38, 0.5)'
      : 'rgba(220, 38, 38, 0.3)'
  };

  box-shadow: ${({ active }: HeaderProps) =>
    active
      ? '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 20px rgba(220, 38, 38, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      : '0 4px 8px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
  };

  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;

  &:hover {
    background: ${({ active }: HeaderProps) =>
      active
        ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.4) 0%, rgba(185, 28, 28, 0.35) 100%)'
        : 'linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(185, 28, 28, 0.2) 100%)'
    };
    border-color: ${({ active }: HeaderProps) =>
      active
        ? 'rgba(220, 38, 38, 0.6)'
        : 'rgba(220, 38, 38, 0.4)'
    };
    transform: translateY(-2px);
    box-shadow: ${({ active }: HeaderProps) =>
      active
        ? '0 12px 24px rgba(0, 0, 0, 0.5), 0 0 30px rgba(220, 38, 38, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.12)'
        : '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 16px rgba(220, 38, 38, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
    };
  }

  &:active {
    transform: translateY(0);
  }

  span {
    font-size: ${(props: any) => props.theme.typography?.fontSize?.base || '16px'};
    font-weight: ${(props: any) => props.theme.typography?.fontWeight?.semibold || 600};
    color: ${(props: any) => props.theme.colors?.text?.primary || '#fef2f2'};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.3px;
  }

  svg {
    color: ${({ active }: HeaderProps) =>
      active
        ? (props: any) => props.theme.colors?.primary || '#dc2626'
        : (props: any) => props.theme.colors?.text?.secondary || '#fecaca'
    };
    filter: ${({ active }: HeaderProps) =>
      active ? 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.6))' : 'none'
    };
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    ${({ active }: HeaderProps) => active && css`
      transform: rotate(180deg);
    `}
  }
`;

const Items = styled.div`
  padding: ${(props: any) => props.theme.spacing?.md || '16px'} ${(props: any) => props.theme.spacing?.sm || '8px'};
  margin-top: ${(props: any) => props.theme.spacing?.sm || '8px'};

  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.15) 0%,
    rgba(185, 28, 28, 0.1) 100%
  );
  border-radius: ${(props: any) => props.theme.borderRadius?.lg || '12px'};
  border: 1px solid rgba(220, 38, 38, 0.25);

  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(220, 38, 38, 0.15);

  overflow: hidden;
`;

const Section: React.FC<SectionProps> = ({ children, title, deps = [] }) => {
  const [active, setActive] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const props = useSpring({
    height: active ? height : 0,
    opacity: active ? 1 : 0,
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, setHeight]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, setHeight, deps]);

  return (
    <Container>
      <Header active={active} onClick={() => setActive(state => !state)}>
        <span>{title}</span>
        {active ? <FiChevronUp size={30} /> : <FiChevronDown size={30} />}
      </Header>

      <animated.div style={{ ...props, overflow: 'hidden' }}>
        <Items ref={ref}>{children}</Items>
      </animated.div>
    </Container>
  );
};

export default Section;
