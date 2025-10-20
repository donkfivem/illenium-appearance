import { useCallback, useRef } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background: linear-gradient(
    145deg,
    rgba(220, 38, 38, 0.2) 0%,
    rgba(185, 28, 28, 0.15) 100%
  );
  border: 1px solid rgba(220, 38, 38, 0.35);
  border-radius: 14px;
  margin-bottom: 12px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(220, 38, 38, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  &:hover {
    background: linear-gradient(
      145deg,
      rgba(220, 38, 38, 0.25) 0%,
      rgba(185, 28, 28, 0.2) 100%
    );
    border-color: rgba(220, 38, 38, 0.5);
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.4),
      0 0 16px rgba(220, 38, 38, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.08);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #fef2f2;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #fef2f2;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.4) 0%, rgba(185, 28, 28, 0.35) 100%);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(220, 38, 38, 0.5);
  min-width: 36px;
  text-align: center;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(220, 38, 38, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.08);
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const MinMaxLabel = styled.small`
  font-size: 11px;
  font-weight: 600;
  color: #fecaca;
  min-width: 22px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const StyledSlider = styled.input<{ percentage: number }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 7px;
  background: linear-gradient(
    to right,
    rgba(220, 38, 38, 0.8) 0%,
    rgba(220, 38, 38, 0.8) ${props => props.percentage}%,
    rgba(40, 10, 10, 0.5) ${props => props.percentage}%,
    rgba(40, 10, 10, 0.5) 100%
  );
  outline: none;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(220, 38, 38, 0.2);

  &:hover {
    background: linear-gradient(
      to right,
      rgba(220, 38, 38, 0.9) 0%,
      rgba(220, 38, 38, 0.9) ${props => props.percentage}%,
      rgba(50, 12, 12, 0.6) ${props => props.percentage}%,
      rgba(50, 12, 12, 0.6) 100%
    );
    box-shadow:
      inset 0 1px 3px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(220, 38, 38, 0.3);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: linear-gradient(145deg, rgba(220, 38, 38, 1) 0%, rgba(185, 28, 28, 1) 100%);
    cursor: pointer;
    border-radius: 50%;
    border: 2.5px solid #fef2f2;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(220, 38, 38, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &:hover {
      transform: scale(1.15);
      background: linear-gradient(145deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 1) 100%);
      box-shadow:
        0 6px 12px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(220, 38, 38, 0.7),
        inset 0 1px 1px rgba(255, 255, 255, 0.3);
    }

    &:active {
      transform: scale(1.08);
      box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.5),
        0 0 16px rgba(220, 38, 38, 0.8),
        inset 0 1px 1px rgba(255, 255, 255, 0.25);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: linear-gradient(145deg, rgba(220, 38, 38, 1) 0%, rgba(185, 28, 28, 1) 100%);
    cursor: pointer;
    border-radius: 50%;
    border: 2.5px solid #fef2f2;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(220, 38, 38, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &:hover {
      transform: scale(1.15);
      background: linear-gradient(145deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 1) 100%);
    }
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 1,
  clientValue,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const percentage = ((defaultValue - min) / (max - min)) * 100;

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const parsedValue = parseFloat(e.target.value);
      onChange(parsedValue);
    },
    [onChange],
  );

  return (
    <Container onClick={handleContainerClick}>
      <Header>
        <Title>{title || 'Setting'}</Title>
        <Value>{defaultValue}</Value>
      </Header>
      <SliderContainer>
        <MinMaxLabel>{min}</MinMaxLabel>
        <StyledSlider
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          percentage={percentage}
          onChange={handleChange}
        />
        <MinMaxLabel>{max}</MinMaxLabel>
      </SliderContainer>
    </Container>
  );
};

export default RangeInput;
