import * as React from 'react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import BookChapterPicker from './book_chapter_picker';

import { BookChapter } from '../bible/constants';

const BibleReader = () => {
  const [bookChapter, setBookChapter] = useState<BookChapter | null>(null);

  const onBookChapterChange = useCallback((bookChapter: BookChapter) => {
    console.log(`onBookChapterChange - ${bookChapter.toString()}`);
    setBookChapter(bookChapter);
  }, [setBookChapter]);

  return (
    <Paper elevation={4} sx={{p: 2}}>
      <Box sx={{mb: 1}}>
        <Typography variant="h5">Read Bible</Typography>
      </Box>

      <Box sx={{mb: 1}}>
        <BookChapterPicker bookChapter={bookChapter} onBookChapterChange={onBookChapterChange}/>
      </Box>

      <Box>
        {bookChapter && bookChapter.toString()}
      </Box>
    </Paper>
  );
};

export default BibleReader;
