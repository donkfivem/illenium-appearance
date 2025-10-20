import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Container = styled.div`
  height: auto;
  min-height: 400px;
  max-height: 85vh;
  width: 400px;
  max-width: 28vw;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: ${(props: any) => props.theme.spacing?.xl || '32px'} ${(props: any) => props.theme.spacing?.lg || '24px'};
  padding-right: ${(props: any) => `calc(${props.theme.spacing?.lg || '24px'} + 8px)`};
  margin: 16px;
  border-radius: 20px;
  position: relative;

  transition: all ${(props: any) => props.theme.animation?.duration?.normal || '0.4s'}
              ${(props: any) => props.theme.animation?.easing?.smooth || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'};

  /* Red gradient background */
  background: linear-gradient(
    145deg,
    rgba(220, 38, 38, 0.25) 0%,
    rgba(185, 28, 28, 0.2) 50%,
    rgba(153, 27, 27, 0.22) 100%
  );

  /* Multi-layered borders for depth */
  border: 1px solid rgba(220, 38, 38, 0.4);
  box-shadow:
    /* Main depth shadow */
    0 32px 64px -12px rgba(0, 0, 0, 0.6),
    /* Red glow */
    0 0 32px rgba(220, 38, 38, 0.2),
    /* Inner highlight */
    inset 0 1px 2px rgba(255, 255, 255, 0.08),
    /* Outer rim light */
    0 0 0 1px rgba(220, 38, 38, 0.15);

  overflow-y: overlay;
  overflow-x: hidden;

  /* Top glass shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(220, 38, 38, 0.05) 30%,
      transparent 100%
    );
    border-radius: 20px 20px 0 0;
    pointer-events: none;
  }

  /* Bottom red glow accent */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 60px;
    background: radial-gradient(
      ellipse at center,
      rgba(220, 38, 38, 0.15) 0%,
      rgba(220, 38, 38, 0.05) 40%,
      transparent 70%
    );
    filter: blur(20px);
    pointer-events: none;
  }

  /* Hover state - enhanced glow */
  &:hover {
    border-color: rgba(220, 38, 38, 0.5);
    background: linear-gradient(
      145deg,
      rgba(220, 38, 38, 0.3) 0%,
      rgba(185, 28, 28, 0.25) 50%,
      rgba(153, 27, 27, 0.27) 100%
    );
    box-shadow:
      0 32px 64px -12px rgba(0, 0, 0, 0.7),
      0 0 48px rgba(220, 38, 38, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(220, 38, 38, 0.3);
  }
  
  /* Custom scrollbar - red glass style */
  scrollbar-width: thin;
  scrollbar-color: rgba(220, 38, 38, 0.6) transparent;

  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      rgba(220, 38, 38, 0.6) 0%,
      rgba(185, 28, 28, 0.8) 100%
    );
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(
        180deg,
        rgba(220, 38, 38, 0.8) 0%,
        rgba(185, 28, 28, 1) 100%
      );
      box-shadow: 0 0 12px rgba(220, 38, 38, 0.5);
    }
  }

  /* Force overlay scrollbar on webkit browsers */
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* Smooth scrolling */
  scroll-behavior: smooth;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: ${(props: any) => props.theme.spacing?.md || '16px'};
  
  > div {
    flex: 1;
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  gap: ${(props: any) => props.theme.spacing?.md || '16px'};
  width: 100%;
`;

export const HeaderSection = styled.div`
  padding-bottom: ${(props: any) => props.theme.spacing?.lg || '24px'};
  border-bottom: 1px solid rgba(220, 38, 38, 0.25);
  margin-bottom: ${(props: any) => props.theme.spacing?.lg || '24px'};
  position: relative;

  /* Red glow line effect */
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(220, 38, 38, 0.5) 50%,
      transparent 100%
    );
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${(props: any) => props.theme.typography?.fontSize?.xl || '20px'};
  font-weight: ${(props: any) => props.theme.typography?.fontWeight?.semibold || 600};
  color: ${(props: any) => props.theme.colors?.text?.primary || '#f8fafc'};
  margin: 0 0 ${(props: any) => props.theme.spacing?.sm || '8px'} 0;
  line-height: ${(props: any) => props.theme.typography?.lineHeight?.tight || 1.25};
`;

export const SectionDescription = styled.p`
  font-size: ${(props: any) => props.theme.typography?.fontSize?.sm || '14px'};
  color: ${(props: any) => props.theme.colors?.text?.secondary || '#cbd5e1'};
  margin: 0;
  line-height: ${(props: any) => props.theme.typography?.lineHeight?.normal || 1.5};
`;
