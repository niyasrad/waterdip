import { forwardRef } from 'react';
// material
import { alpha, useTheme } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

interface MIconButtonProps extends Omit<IconButtonProps, 'color'> {
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

const MIconButton = forwardRef<HTMLButtonElement, MIconButtonProps>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <ButtonAnimate>
          <IconButton ref={ref} color={color} sx={sx} {...other} size="large">
            {children}
          </IconButton>
        </ButtonAnimate>
      );
    }

    return (
      <ButtonAnimate>
        <IconButton
          ref={ref}
          sx={{
            color: theme.palette[color].main,
            '&:hover': {
              bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
            },
            ...sx
          }}
          {...other}
          size="large">
          {children}
        </IconButton>
      </ButtonAnimate>
    );
  }
);

export default MIconButton;
