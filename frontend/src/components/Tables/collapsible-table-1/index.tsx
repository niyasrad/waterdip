// material
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../../Scrollbar';
//
import CollapsibleTableRow from './CollapsibleTableRow';
import { colors } from '../../../theme/colors';

const PREFIX = 'index';

const classes = {
  tableHead: `${PREFIX}-tableHead`
};

const StyledScrollbar = styled(Scrollbar)(() => ({
  [`& .${classes.tableHead}`]: {
    backgroundColor: colors.tableHeadBack,
    color: colors.text,
    boxShadow: 'none !important',
    borderBottomLeftRadius: '0px !important',
    borderBottomRightRadius: '0px !important'
  }
}));

type Props = {
  dataValue: any;
  tablehead_name: string;
};
export default function CollapsibleTable({ tablehead_name, dataValue }: Props) {

  return (
    <StyledScrollbar>
      <TableContainer sx={{ minWidth: 500, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} width="20">
                &nbsp;&nbsp;&nbsp;&nbsp;{tablehead_name}
              </TableCell>
              <TableCell className={classes.tableHead} align="center" width="20">
                Drift Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataValue.map((row: any) => (
              <CollapsibleTableRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledScrollbar>
  );
}
