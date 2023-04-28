import * as React from 'react';
import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import JourneySummaryItem from './journey_summary_item';

import { Summary } from '../types/summary';
import { BOOKS, BookChapter } from '../bible/constants';

import { getRandomColorHex } from '../utils/color';

interface JourneySummaryCardProps {
  onSelectBookChapter: (bookChapter: BookChapter) => void;
}

const JourneySummaryCard = (props: JourneySummaryCardProps) => {
  const summaries = useMemo(() => BOOKS.map((book) => {
    return new Summary(book, '#999999');
  }).slice(0, 5), []);

  return (
    <Paper elevation={4} sx={{height: 400, width: '100%', overflow: 'auto', p: 2}}>
      <Box sx={{mb: 2}}>
        <Typography variant="h5">Journey Summary</Typography>
      </Box>

      <Box>
        {summaries.map((summary) => (
          <Box key={summary.book.name} sx={{mb: 1}}>
            <JourneySummaryItem summary={summary} onSelectBookChapter={props.onSelectBookChapter}/>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default JourneySummaryCard;
