import { styled } from '@mui/material/styles';
import { Button, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import { MIconButton } from './@material-extend';

const PREFIX = 'Heading';

const classes = {
  heading: `${PREFIX}-heading`,
  cardheading: `${PREFIX}-cardheading`,
  info: `${PREFIX}-info`
};

const Root = styled('div')({
  [`&.${classes.heading}`]: {
    fontSize: '.9rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '.25px',
    paddingBottom: '.6rem'
  },
  [`&.${classes.cardheading}`]: {
    fontSize: '.9rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '.25px',
    paddingBottom: '.25rem',
    textTransform: 'uppercase'
  },
  [`& .${classes.info}`]: {}
});

type headingProps = {
  heading: string;
  subtitle?: string;
};

export function Heading({ heading, subtitle }: headingProps) {

  return (
    <Root className={classes.heading}>
      {heading}
      {subtitle && (
        <Tooltip title={subtitle} placement="right">
          <MIconButton
            color="inherit"
            sx={{
              p: 0,
              width: 21,
              height: 21,
              marginLeft: '.5rem'
            }}
          >
            <Icon icon={infoOutline} width={20} height={20} />
          </MIconButton>
        </Tooltip>
      )}
    </Root>
  );
}
export function CardHeading({ heading, subtitle }: headingProps) {


  return (
    <Root className={classes.cardheading}>
      {heading}
      {subtitle && (
        <Tooltip title={subtitle} placement="right">
          <MIconButton
            color="inherit"
            sx={{
              p: 0,
              width: 18,
              height: 18,
              marginLeft: '.5rem'
            }}
          >
            <Icon icon={infoOutline} width={18} height={18} />
          </MIconButton>
        </Tooltip>
      )}
    </Root>
  );
}
