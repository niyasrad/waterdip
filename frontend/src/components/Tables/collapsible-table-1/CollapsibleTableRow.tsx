import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';

// material
import {
  Box,
  Table,
  Collapse,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton
} from '@mui/material';
import { ChartBar } from 'components/charts';
import { colors } from '../../../theme/colors';

const PREFIX = 'CollapsibleTableRow';

const classes = {
  openBack: `${PREFIX}-openBack`,
  pointer: `${PREFIX}-pointer`,
  name: `${PREFIX}-name`,
  impact: `${PREFIX}-impact`,
  minMax: `${PREFIX}-minMax`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(TableRow)(() => ({
  width: '100%',
  border: `1px solid ${colors.tableHeadBack}`, 
  [`& .${classes.openBack}`]: {
    backgroundColor: colors.boxBackground,
  },

  [`& .${classes.pointer}`]: {
    '&:hover': {
      backgroundColor: colors.boxBackground,
      cursor: 'pointer'
    }
  },

  [`& .${classes.name}`]: {
    textTransform: 'capitalize',
    fontWeight: 600,
    color: colors.textPrimary,
    fontSize: '0.875rem',
  },

  [`& .${classes.impact}`]: {
    fontWeight: 500,
    color: colors.text,
    fontSize: '0.8rem'
  },

  [`& .${classes.minMax}`]: { fontSize: '.75rem', fontWeight: 500 }
}));

export default function CollapsibleTableRow(props: { row: any }) {

  const { row } = props;

  return (
    (<Root>
        <TableCell className={classes.name}>
          &nbsp;
          {row.name}
        </TableCell>

        <TableCell align="center" width="20%">
          {Math.round(row.driftscore * 1000) / 1000}
        </TableCell>
    </Root>)
  );
}
