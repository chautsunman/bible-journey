import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import JourneySummaryItem from './journey_summary_item';

import AppContext from '../app_components/app_context';
import { Summary, INIT_SUMMARIES } from '../types/summary';
import Colors from '../types/colors';
import { Subscriber } from '../services/subscription';
import { BookChapter } from '../bible/constants';

interface JourneySummaryCardProps {
  appContext: AppContext;
  onSelectBookChapter: (bookChapter: BookChapter) => void;
}

const JourneySummaryCard = (props: JourneySummaryCardProps) => {
  const {appContext} = props;

  const [summaries, setSummaries] = useState<Summary[]>(INIT_SUMMARIES);
  const [colors, setColors] = useState<Colors>(Colors.newEmptyRecord());

  const onColorsUpdate: Subscriber<Colors> = useMemo(() => ({
    onData: (data) => {
      console.log('onColorsUpdate - onData', data);
      setColors(data);
    }
  }), [setColors]);

  useEffect(() => {
    appContext.colorsService.subscribe(onColorsUpdate);
    return () => {
      appContext.colorsService.unsubscribe(onColorsUpdate);
    };
  }, [appContext, onColorsUpdate]);

  return (
    <Paper elevation={4} sx={{height: 400, width: '100%', overflow: 'auto', p: 2}}>
      <Box sx={{mb: 2}}>
        <Typography variant="h5">Journey Summary</Typography>
      </Box>

      <Box>
        {summaries.map((summary) => (
          <Box key={summary.book.name} sx={{mb: 1}}>
            <JourneySummaryItem summary={summary} onSelectBookChapter={props.onSelectBookChapter} colors={colors}/>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default JourneySummaryCard;
