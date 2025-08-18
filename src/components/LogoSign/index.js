import {
  Box,
  Tooltip,
  Badge,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        width: 70px;
        height: 50px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 64px;
        height: 48px;
        position: relative;
        background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        padding: 6px;
        box-shadow: 
          0 8px 32px rgba(76, 175, 80, 0.15),
          inset 0 1px 0 rgba(255,255,255,0.2);
`
);

// Modern wheat/grain stalk
const WheatStalk = styled(Box)(
  () => `
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 3px;
        height: 28px;
        background: linear-gradient(to bottom, #8BC34A 0%, #689F38 100%);
        border-radius: 1.5px;
        box-shadow: 0 2px 4px rgba(104, 159, 56, 0.3);
        
        &:before,
        &:after {
            content: "";
            position: absolute;
            width: 8px;
            height: 4px;
            background: linear-gradient(135deg, #FDD835 0%, #FBC02D 100%);
            border-radius: 2px;
            box-shadow: 0 1px 2px rgba(251, 192, 45, 0.4);
        }
        
        &:before {
            top: 2px;
            left: -6px;
            transform: rotate(-30deg);
        }
        
        &:after {
            top: 2px;
            right: -6px;
            transform: rotate(30deg);
        }
`
);

// Multiple grain kernels on the stalk
const GrainKernel = styled(Box)(
  ({ position }) => `
        position: absolute;
        width: 6px;
        height: 3px;
        background: linear-gradient(135deg, #FFD54F 0%, #FFC107 100%);
        border-radius: 3px;
        left: ${position.left};
        top: ${position.top};
        transform: rotate(${position.rotation}deg);
        box-shadow: 0 1px 3px rgba(255, 193, 7, 0.4);
`
);

// Modern circular field background
const FieldBackground = styled(Box)(
  () => `
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 48px;
        height: 12px;
        background: linear-gradient(135deg, #4CAF50 0%, #388E3C 30%, #2E7D32 100%);
        border-radius: 24px;
        box-shadow: 
          0 2px 8px rgba(46, 125, 50, 0.3),
          inset 0 1px 0 rgba(255,255,255,0.1);
        
        &:before {
            content: "";
            position: absolute;
            width: 40px;
            height: 4px;
            background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
            top: -2px;
            left: 4px;
            border-radius: 2px;
            box-shadow: 0 1px 2px rgba(102, 187, 106, 0.4);
        }
`
);

// Growth rings/circular elements
const GrowthRing = styled(Box)(
  ({ size, opacity }) => `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border: 1px solid rgba(76, 175, 80, ${opacity});
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: pulse 3s ease-in-out infinite;
        animation-delay: ${opacity * 1000}ms;
        
        @keyframes pulse {
            0%, 100% {
                opacity: ${opacity};
                transform: translate(-50%, -50%) scale(1);
            }
            50% {
                opacity: ${opacity * 0.5};
                transform: translate(-50%, -50%) scale(1.1);
            }
        }
`
);

const TooltipWrapper = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    color: '#ffffff',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
    boxShadow:
      '0 8px 32px rgba(76, 175, 80, 0.3), 0 2px 8px rgba(0,0,0,0.1)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(76, 175, 80, 0.95)'
  }
}));

function Logo() {
  const theme = useTheme();

  const grainPositions = [
    { left: '-4px', top: '6px', rotation: -25 },
    { left: '4px', top: '6px', rotation: 25 },
    { left: '-5px', top: '10px', rotation: -35 },
    { left: '5px', top: '10px', rotation: 35 },
    { left: '-4px', top: '14px', rotation: -25 },
    { left: '4px', top: '14px', rotation: 25 },
    { left: '-3px', top: '18px', rotation: -20 },
    { left: '3px', top: '18px', rotation: 20 }
  ];

  return (
    <TooltipWrapper
      title="AgriDash 2.0 - Smart Agriculture Management"
      arrow
      placement="right"
    >
      <LogoWrapper to="/admin/overview">
        <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(9),
              right: -8,
              top: 2,
              background: 'linear-gradient(135deg, #FF6B35 0%, #E64A19 100%)',
              color: 'white',
              fontWeight: 'bold',
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 2px 8px rgba(255, 107, 53, 0.4)'
            }
          }}
          overlap="circular"
          badgeContent="2.0"
        >
          <LogoSignWrapper>
            {/* Animated growth rings */}
            <GrowthRing size={20} opacity={0.3} />
            <GrowthRing size={32} opacity={0.2} />
            <GrowthRing size={44} opacity={0.1} />
            
            {/* Field background */}
            <FieldBackground />
            
            {/* Main wheat stalk */}
            <WheatStalk />
            
            {/* Grain kernels */}
            {grainPositions.map((pos, index) => (
              <GrainKernel key={index} position={pos} />
            ))}
          </LogoSignWrapper>
        </Badge>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;