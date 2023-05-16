import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import searchFill from '@iconify/icons-eva/search-fill';
// import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
// import plusFill from '@iconify/icons-eva/plus-fill';
import { useState, useEffect } from 'react';

import { Box, OutlinedInput, InputAdornment, Button } from '@mui/material';
import { colors } from '../../theme/colors';

const PREFIX = 'AlertListToolbar';

const classes = {
  monitorlist_toolbar_container: `${PREFIX}-monitorlist_toolbar_container`,
  toolbar_search_filter: `${PREFIX}-toolbar_search_filter`,
  search: `${PREFIX}-search`
};

const Root = styled('div')(() => ({
  [`&.${classes.monitorlist_toolbar_container}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.75rem 0rem'
  },

  [`& .${classes.toolbar_search_filter}`]: {
    display: 'flex',
    alignItems: 'center'
  },

  [`& .${classes.search}`]: {
    marginRight: '1.2rem'
  }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 360,
  height: 40,
  borderRadius: 4,
  background: '#fff',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 360, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

type ModelListToolbarProps = {
  searchName: string;
  onSearch: (value: string) => void;
};

export default function AlertListToolbar({ searchName, onSearch }: any) {

  const [value, setValue] = useState(searchName);
  useEffect(() => {
    onSearch(value);
  }, [value]);
  return (
    <Root className={classes.monitorlist_toolbar_container}>
      <div className={classes.toolbar_search_filter}>
        <div className={classes.search}>
          <SearchStyle
            value={searchName}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search "
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
        </div>
      </div>
    </Root>
  );
}
