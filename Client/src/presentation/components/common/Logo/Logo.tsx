import React from 'react';
import * as S from './style';

interface LogoProps {
  size?: number;
}

/**
 * People Square Logo Component
 * Displays the 4-quadrant logo with animated floating effect
 */
const Logo: React.FC<LogoProps> = ({ size = 80 }) => {
  return (
    <S.LogoSVG width={size} height={size} viewBox="0 0 100 100">
      <rect x="2" y="2" width="96" height="96" rx="4" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="2" />
      {/* Red quadrant */}
      <rect x="6" y="6" width="42" height="42" fill="#E63946" />
      {/* Yellow quadrant */}
      <rect x="52" y="6" width="42" height="42" fill="#F4B942" />
      {/* Green quadrant */}
      <rect x="6" y="52" width="42" height="42" fill="#2D9E49" />
      {/* Blue quadrant */}
      <rect x="52" y="52" width="42" height="42" fill="#4A90D9" />
      {/* Center white circle */}
      <circle cx="50" cy="50" r="18" fill="white" />
    </S.LogoSVG>
  );
};

export default Logo;

