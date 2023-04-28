import * as React from 'react';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { BOOKS, BookChapter, getBookFromName } from '../bible/constants';

interface BookChapterPickerProps {
  bookChapter: BookChapter | null;
  onBookChapterChange: (bookChapter: BookChapter) => void;
}

const BookChapterPicker = (props: BookChapterPickerProps) => {
  const {bookChapter, onBookChapterChange: onChange} = props;

  const onBookChange = useCallback((event: SelectChangeEvent) => {
    const bookName = event.target.value as string;
    const book = getBookFromName(bookName);
    console.log(`onBookChange - ${bookName}, ${onChange}`);
    if (book) {
      console.log(`onBookChange - onChange, ${onChange}`);
      onChange(new BookChapter(book, 1));
    }
  }, [onChange]);

  const onChapterChange = useCallback((event: SelectChangeEvent) => {
    const chapterStr = event.target.value as string;
    let chapter = -1;
    try {
      chapter = parseInt(chapterStr);
    } catch (err) {
      console.log(`onChapterChange - cannot parse ${chapterStr}`, err);
    }
    console.log(`onChapterChange - ${chapter}, ${onChange}`);
    if (bookChapter && chapter !== -1 && chapter > 0 && chapter <= bookChapter.book.numChapters) {
      console.log(`onChapterChange - onChange, ${onChange}`);
      onChange(new BookChapter(bookChapter.book, chapter));
    }
  }, [bookChapter, onChange]);

  const chapterIdList = [];
  if (bookChapter) {
    for (let i = 0; i < bookChapter.book.numChapters; i++) {
      chapterIdList.push(i + 1);
    }
  }

  const chapterSelectedStr = (bookChapter && bookChapter.chapter > 0) ? bookChapter.chapter.toString() : '';

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{flex: '1 1 0'}}>
        <FormControl fullWidth>
          <InputLabel id="bible-reader-book-label">Book</InputLabel>
          <Select
            labelId="bible-reader-book-label"
            id="bible-reader-book-select"
            value={bookChapter?.book.name ?? ''}
            label="Book"
            onChange={onBookChange}
          >
            {BOOKS.map((book) => (
              <MenuItem key={book.name} value={book.name}>{book.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{mr: 1}}/>

      <Box sx={{flex: '1 1 0'}}>
        <FormControl fullWidth>
          <InputLabel id="bible-reader-chapter-label">Chapter</InputLabel>
          <Select
            labelId="bible-reader-chapter-label"
            id="bible-reader-chapter-select"
            value={chapterSelectedStr}
            label="Chapter"
            onChange={onChapterChange}
          >
            {chapterIdList.map((chapterId) => (
              <MenuItem key={chapterId} value={chapterId.toString()}>{chapterId}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default BookChapterPicker;
