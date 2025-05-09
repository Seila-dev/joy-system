import React from 'react';
import styled from 'styled-components';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
  variant?: 'circle' | 'bar';
}

const Wrapper = styled.div<{ $size: number; $variant: string }>`
  position: relative;
  display: inline-flex;
  ${({ $variant, $size }) =>
    $variant === 'circle'
      ? `
    width: ${$size}px;
    height: ${$size}px;
  `
      : `
    width: 100%;
    height: ${$size}px;
  `}
`;

const StyledSvg = styled.svg<{ $variant: string }>`
  ${({ $variant }) =>
    $variant === 'circle' &&
    `
    transform: rotate(-90deg);
  `}
  width: 100%;
  height: 100%;
`;

const CenterContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'rgb(139, 92, 246)',
  bgColor = 'rgba(139, 92, 246, 0.3)',
  children,
  variant = 'circle'
}: ProgressRingProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  if (variant === 'bar') {
    return (
      <Wrapper $size={strokeWidth} $variant="bar">
        <StyledSvg
          $variant="bar"
          viewBox={`0 0 100 ${strokeWidth}`}
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            width="100"
            height={strokeWidth}
            fill={bgColor}
            rx={strokeWidth / 2}
            ry={strokeWidth / 2}
          />
          <rect
            x="0"
            y="0"
            width={normalizedProgress}
            height={strokeWidth}
            fill={color}
            rx={strokeWidth / 2}
            ry={strokeWidth / 2}
            style={{ transition: 'width 0.5s ease-in-out' }}
          />
        </StyledSvg>
        {children && <CenterContent>{children}</CenterContent>}
      </Wrapper>
    );
  }

  // Circular version
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <Wrapper $size={size} $variant="circle">
      <StyledSvg $variant="circle" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </StyledSvg>
      {children && <CenterContent>{children}</CenterContent>}
    </Wrapper>
  );
}