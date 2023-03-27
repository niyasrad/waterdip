import { Heading } from '../../../../components/Heading';
import { styled } from '@mui/material/styles';
import { useSelector } from '../../../../redux/store';
import { DateRangeFilterState } from '../../../../redux/slices/dateRangeFilter';
import { formatDateTime } from '../../../../utils/date';
import { Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH_PAGE, PATH_DASHBOARD } from '../../../../routes/paths';
import { colors } from '../../../../theme/colors';
import { useMemo } from 'react';

const PREFIX = 'BaseLine';

const classes = {
  baseLine: `${PREFIX}-baseLine`,
  baseLineContent: `${PREFIX}-baseLineContent`,
  contentHeading: `${PREFIX}-contentHeading`,
  contentText: `${PREFIX}-contentText`,
  contentButton: `${PREFIX}-contentButton`
};

const Root = styled('div')({
  [`&.${classes.baseLine}`]: {
    paddingLeft: '.8rem',
    marginTop: '-2rem'
  },
  [`& .${classes.baseLineContent}`]: {
    marginTop: '.6rem',
    width: '100%',
    color: colors.text,
    background: colors.boxBackground,
    borderRadius: '4px',
    padding: '1rem'
  },
  [`& .${classes.contentHeading}`]: {
    fontSize: '.85rem',
    fontWeight: 600,
    letterSpacing: '.25px',
    marginBottom: '.5rem'
  },
  [`& .${classes.contentText}`]: {
    fontSize: '.8rem',
    fontWeight: 500,
    letterSpacing: '.25px',
    padding: '.7rem 0 .5rem'
  },
  [`& .${classes.contentButton}`]: {
    padding: '.5rem 0rem',
    fontSize: '.8rem',
    fontWeight: 500,
    letterSpacing: '.25px',
    color: colors.textPrimary
  }
});

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function BaseLine() {
  const navigate = useNavigate();
  const { modelId, tabName } = useParams();

  let query = useQuery();
  const now = new Date();

  const { fromDate, toDate } = useSelector(
    (state: { dateRangeFilter: DateRangeFilterState }) => state.dateRangeFilter
  );

  const dateTimeString = `${formatDateTime(fromDate ? fromDate : now)} to ${formatDateTime(
    toDate ? toDate : now
  )} `;

  return (
    <Root className={classes.baseLine}>
      <Heading heading="BaseLine" subtitle="baseline" />
      <div className={classes.baseLineContent}>
        <div className={classes.contentHeading}>Production</div>
        <hr />
        <div className={classes.contentText}>Date from {dateTimeString}</div>
        <Button
          className={classes.contentButton}
          onClick={() =>
            navigate(`${PATH_DASHBOARD.general.models}/${modelId}/configuration?version_id=${query.get('version_id')}`, {
              state: { baseline: true }
            })
          }
        >
          Configure baseline {'>'}
        </Button>
      </div>
    </Root>
  );
}
