import * as React from 'react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BibleReader from './components/bible_reader';
import JourneySummaryCard from './components/journey_summary_card';
import JourneyRecordsPage from './journey_records/journey_records_page';

import { RecordsFilter } from './types/records_filter';
import { BookChapter } from './bible/constants';
import AppContext from './app_components/app_context';

interface HomePageProps {
  appContext: AppContext;
}

const Home = (props: HomePageProps) => {
  const {appContext} = props;

  const [recordsFilter, setRecordsFilter] = useState<RecordsFilter>(RecordsFilter.getEmptyFilter());

  const onSelectBookChapter = useCallback(async (bookChapter: BookChapter) => {
    setRecordsFilter(RecordsFilter.createBookChapterFilter(bookChapter));
  }, [setRecordsFilter]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{mb: 2}}>
            <BibleReader/>
          </Box>

          <Box>
            <JourneySummaryCard appContext={appContext} onSelectBookChapter={onSelectBookChapter}/>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <JourneyRecordsPage appContext={appContext} recordsFilter={recordsFilter}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
