import { useState, useRef, useEffect, ReactElement, useCallback, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  FaVideo,
  FaStreetView,
  FaUndo,
  FaRedo,
  FaSmile,
  FaMale,
  FaShoePrints,
  FaSave,
  FaTimes,
  FaTshirt,
  FaHatCowboy,
  FaSocks,
} from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';

import { CameraState, ClothesState, RotateState } from './interfaces';

interface ToggleButtonProps {
  active: boolean;
}

interface ToggleOptionProps {
  active: boolean;
  onClick: () => void;
  children?: ReactNode;
}

interface ExtendendContainerProps {
  width: number;
}

interface ExtendendOptionProps {
  icon: ReactElement;
  children?: ReactNode;
}

interface OptionsProps {
  camera: CameraState;
  rotate: RotateState;
  clothes: ClothesState;
  handleSetClothes: (key: keyof ClothesState) => void;
  handleSetCamera: (key: keyof CameraState) => void;
  handleTurnAround: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleSave: () => void;
  handleExit: () => void;
  enableExit: boolean;
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;

  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(
    145deg,
    rgba(220, 38, 38, 0.25) 0%,
    rgba(185, 28, 28, 0.2) 100%
  );
  border: 1px solid rgba(220, 38, 38, 0.35);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(220, 38, 38, 0.2);

  z-index: 10;
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  height: 48px;
  width: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${(props: any) => props.theme.borderRadius?.lg || '12px'};

  background: ${({ active }) =>
    active
      ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.9) 100%)'
      : 'rgba(220, 38, 38, 0.2)'
  };

  color: ${({ active }) =>
    active
      ? '#fef2f2'
      : 'rgba(254, 202, 202, 0.9)'
  };

  border: 1px solid ${({ active }) =>
    active
      ? 'rgba(220, 38, 38, 0.6)'
      : 'rgba(220, 38, 38, 0.35)'
  };

  box-shadow: ${({ active }) =>
    active
      ? '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 12px rgba(220, 38, 38, 0.4)'
      : '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);

    background: ${({ active }) =>
      active
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 0.95) 100%)'
        : 'rgba(220, 38, 38, 0.3)'
    };

    box-shadow: ${({ active }) =>
      active
        ? '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 20px rgba(220, 38, 38, 0.5)'
        : '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2)'
    };

    color: ${({ active }) =>
      active
        ? '#fef2f2'
        : 'rgba(254, 242, 242, 1)'
    };
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const Option = styled.button`
  height: 48px;
  width: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${(props: any) => props.theme.borderRadius?.lg || '12px'};

  background: rgba(220, 38, 38, 0.2);
  color: rgba(254, 202, 202, 0.9);
  border: 1px solid rgba(220, 38, 38, 0.35);

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2);
    background: rgba(220, 38, 38, 0.3);
    color: rgba(254, 242, 242, 1);
    border-color: rgba(220, 38, 38, 0.5);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const ExtendedContainer = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  overflow: visible;
  
  &:hover {
    .extended-panel {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }
  }
`;

const ExtendedIcon = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: rgba(254, 202, 202, 0.9);
  background: rgba(220, 38, 38, 0.2);
  border: 1px solid rgba(220, 38, 38, 0.35);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(220, 38, 38, 0.3);
    color: rgba(254, 242, 242, 1);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 8px rgba(220, 38, 38, 0.2);
  }
`;

const ExtendedPanel = styled.div`
  position: absolute;
  right: 51px;
  top: 0;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 20;
`;

const ToggleOption: React.FC<ToggleOptionProps> = ({ children, active, onClick }) => {
  return (
    <ToggleButton type="button" active={active} onClick={onClick}>
      {children}
    </ToggleButton>
  );
};

const ExtendedOption: React.FC<ExtendendOptionProps> = ({ children, icon }) => {
  return (
    <ExtendedContainer>
      <ExtendedIcon>{icon}</ExtendedIcon>
      <ExtendedPanel className="extended-panel">
        {children}
      </ExtendedPanel>
    </ExtendedContainer>
  );
};

const Options: React.FC<OptionsProps> = ({
  camera,
  rotate,
  clothes,
  handleSetClothes,
  handleSetCamera,
  handleTurnAround,
  handleRotateLeft,
  handleRotateRight,
  handleExit,
  handleSave,
  enableExit
}) => {
  return (
    <Container>
      <ExtendedOption icon={<FaVideo size={20} />}>
        <ToggleOption active={camera.head} onClick={() => handleSetCamera('head')}>
          <FaSmile size={20} />
        </ToggleOption>
        <ToggleOption active={camera.body} onClick={() => handleSetCamera('body')}>
          <FaMale size={20} />
        </ToggleOption>
        <ToggleOption active={camera.bottom} onClick={() => handleSetCamera('bottom')}>
          <FaShoePrints size={20} />
        </ToggleOption>
      </ExtendedOption>
      <ExtendedOption icon={<GiClothes size={20} />}>
        <ToggleOption active={clothes.head} onClick={() => handleSetClothes('head')}>
          <FaHatCowboy size={20} />
        </ToggleOption>
        <ToggleOption active={clothes.body} onClick={() => handleSetClothes('body')}>
          <FaTshirt size={20} />
        </ToggleOption>
        <ToggleOption active={clothes.bottom} onClick={() => handleSetClothes('bottom')}>
          <FaSocks size={20} />
        </ToggleOption>
      </ExtendedOption>
      <Option onClick={handleTurnAround}>
        <FaStreetView size={20} />
      </Option>
      <ToggleOption active={rotate.left} onClick={handleRotateLeft}>
        <FaRedo size={20} />
      </ToggleOption>
      <ToggleOption active={rotate.right} onClick={handleRotateRight}>
        <FaUndo size={20} />
      </ToggleOption>
      <Option onClick={handleSave}>
        <FaSave size={20} />
      </Option>
      {enableExit &&
      <Option onClick={handleExit}>
        <FaTimes size={20} />
      </Option>}
      
    </Container>
  );
};

export default Options;
