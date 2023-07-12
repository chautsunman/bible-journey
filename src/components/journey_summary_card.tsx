import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import JourneySummaryItem from './journey_summary_item';

import AppContext from '../app_components/app_context';
import { Summary, INIT_SUMMARY } from '../types/summary';
import { Subscriber } from '../services/subscription';
import { BookChapter, BOOKS } from '../bible/constants';

interface JourneySummaryCardProps {
  appContext: AppContext;
  onSelectBookChapter: (bookChapter: BookChapter) => void;
}

const JourneySummaryCard = (props: JourneySummaryCardProps) => {
  const {appContext} = props;

  const [summary, setSummary] = useState<Summary>(INIT_SUMMARY);

  const onSummaryUpdate: Subscriber<Summary> = useMemo(() => ({
    onData: (data) => {
      console.log('onSummaryUpdate - onData', data);
      setSummary(data);
    }
  }), [setSummary]);

  useEffect(() => {
    appContext.summaryService.subscribe(onSummaryUpdate);
    return () => {
      appContext.summaryService.unsubscribe(onSummaryUpdate);
    };
  }, [appContext, onSummaryUpdate]);

  return (
    <Paper elevation={4} sx={{height: 400, width: '100%', overflow: 'auto', p: 2}}>
      <Box sx={{mb: 2}}>
        <Typography variant="h5">Journey Summary</Typography>
      </Box>

      <Box>
        {BOOKS.map((book) => (
          <Box key={book.name} sx={{mb: 1}}>
            <JourneySummaryItem bookSummary={summary.getBookSummary(book)} onSelectBookChapter={props.onSelectBookChapter}/>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default JourneySummaryCard;
