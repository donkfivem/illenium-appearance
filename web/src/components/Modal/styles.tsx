import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.6);
  
  user-select: none;
`;

export const ModalContainer = styled.div`
  min-width: 400px;
  max-width: 500px;
  padding: 32px;
  position: relative;

  background: linear-gradient(
    145deg,
    rgba(220, 38, 38, 0.3) 0%,
    rgba(185, 28, 28, 0.25) 100%
  );
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 16px;

  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(220, 38, 38, 0.3),
    0 0 0 1px rgba(220, 38, 38, 0.2);

  animation: modalEnter 0.3s ease-out;

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
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
      rgba(220, 38, 38, 0.6) 50%,
      transparent 100%
    );
    border-radius: 16px 16px 0 0;
  }
  
  p {
    font-size: 24px;
    font-weight: 600;
    color: #fef2f2;
    text-align: center;
    margin: 0 0 16px 0;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  span {
    font-size: 16px;
    font-weight: 400;
    color: #fecaca;
    text-align: center;
    display: block;
    margin-bottom: 32px;
    line-height: 1.5;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  button {
    min-width: 120px;
    height: 48px;
    padding: 0 24px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 16px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 12px;
    border: none;
    outline: none;
    cursor: pointer;
    
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    /* Accept Button (Red) */
    &:first-child {
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.9) 100%);
      color: #fef2f2;
      border: 1px solid rgba(220, 38, 38, 0.6);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

      &:hover {
        background: linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 0.95) 100%);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(220, 38, 38, 0.5);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0) scale(0.98);
      }
    }
    
    /* Decline Button (Darker Red) */
    &:last-child {
      background: linear-gradient(135deg, rgba(185, 28, 28, 0.8) 0%, rgba(153, 27, 27, 0.75) 100%);
      color: #fef2f2;
      border: 1px solid rgba(185, 28, 28, 0.5);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

      &:hover {
        background: linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(185, 28, 28, 0.85) 100%);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 16px rgba(185, 28, 28, 0.4);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0) scale(0.98);
      }
    }
    
    /* Modern glassmorphism effect for buttons */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.3) 50%, 
        transparent 100%
      );
    }
  }
`;
