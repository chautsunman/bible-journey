import * as React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import TypeColorBlock from './type_color_block';

import { Summary } from '../types/summary';
import { BookChapter } from '../bible/constants';

interface JourneySummaryItemProps {
  summary: Summary;
  onSelectBookChapter: (bookChapter: BookChapter) => void;
}

const JourneySummaryItem = (props: JourneySummaryItemProps) => {
  const {summary, onSelectBookChapter} = props;

  const chapterIdxes = [];
  for (let i = 0; i < summary.book.numChapters; i++) {
    chapterIdxes.push(i + 1);
  }

  return (
    <Paper elevation={1}>
      <Box sx={{p: 1, display: 'flex'}}>
        <Box sx={{flex: '0 0 128px'}}>
          {summary.book.name}
        </Box>
        <Box sx={{flex: '1 1 0px'}}>
          {chapterIdxes.map((chapterIdx) => (
            <Chip
              key={chapterIdx}
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Box sx={{flex: '0 0 auto'}}>{chapterIdx}</Box>
                  <Box sx={{flex: '0 0 4px'}}/>
                  <Box sx={{flex: '0 0 auto'}}>
                    <TypeColorBlock color={summary.color}/>
                  </Box>
                </Box>
              }
              onClick={() => onSelectBookChapter(new BookChapter(summary.book, chapterIdx))}
              sx={{width: '64px', pointer: 'cursor'}}/>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default JourneySummaryItem;
