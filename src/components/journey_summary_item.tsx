import * as React from 'react';
import { useMemo } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import TypeColorBlock from './type_color_block';

import { BookSummary } from '../types/summary';
import { BookChapter } from '../bible/constants';

interface JourneySummaryItemProps {
  bookSummary: BookSummary;
  onSelectBookChapter: (bookChapter: BookChapter) => void;
}

const JourneySummaryItem = (props: JourneySummaryItemProps) => {
  const {bookSummary, onSelectBookChapter} = props;
  const book = bookSummary.book;

  const chapterIdxes = useMemo(() => {
    const idxes = [];
    for (let i = 0; i < book.numChapters; i++) {
      idxes.push((i + 1).toString());
    }
    return idxes;
  }, [book]);

  return (
    <Paper elevation={1}>
      <Box sx={{p: 1, display: 'flex'}}>
        <Box sx={{flex: '0 0 128px'}}>
          {book.name}
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
                    <TypeColorBlock color={bookSummary.getChapterColor(chapterIdx)}/>
                  </Box>
                </Box>
              }
              onClick={() => onSelectBookChapter(new BookChapter(book, parseInt(chapterIdx)))}
              sx={{width: '64px', pointer: 'cursor'}}/>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default JourneySummaryItem;
