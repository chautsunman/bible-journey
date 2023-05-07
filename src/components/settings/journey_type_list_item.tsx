import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import JourneyTypeEditItem from './journey_type_edit_item';
import TypeColorBlock from '../type_color_block';

import JourneyType from '../../types/journey_type';
import { RecordState } from '../../types/general';

interface JourneyTypeListItemProps {
  initData: JourneyType;
  onSave: (journeyType: JourneyType) => void;
  onDelete: (journeyType: JourneyType) => void;
}

const JourneyTypeListItem = (props: JourneyTypeListItemProps) => {
  const {initData, onSave, onDelete} = props;

  const [journeyType, setJourneyType] = useState(JourneyType.newEmptyRecord());
  const [recordState, setRecordState] = useState(RecordState.READ);

  const onEditBtnClick = useCallback(() => {
    setRecordState(RecordState.EDIT);
  }, [setRecordState]);

  const onDeleteBtnClick = useCallback(() => {
    onDelete(journeyType);
  }, [onDelete, journeyType]);

  const onSaveBtnClick = useCallback(() => {
    onSave(journeyType);
    setRecordState(RecordState.READ);
  }, [onSave, journeyType, setRecordState]);

  useEffect(() => {
    setJourneyType(initData);
  }, [initData, setJourneyType]);

  let recordComp = null;
  if (recordState === RecordState.READ) {
    recordComp = (
      <ListItem
        secondaryAction={
          <Stack direction="row" spacing={1}>
            <IconButton edge="end" onClick={onEditBtnClick} aria-label="edit">
              <ModeEditIcon/>
            </IconButton>
            <IconButton edge="end" onClick={onDeleteBtnClick} aria-label="delete">
              <DeleteIcon/>
            </IconButton>
          </Stack>
        }>
        <ListItemText primary={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{flex: '0 0 auto'}}>{journeyType.type}</Box>
            <Box sx={{flex: '0 0 4px'}}/>
            <Box sx={{flex: '0 0 auto'}}>
              <TypeColorBlock color={journeyType.color}/>
            </Box>
          </Box>
        }/>
      </ListItem>
    );
  } else {
    recordComp = (
      <JourneyTypeEditItem journeyType={journeyType} setJourneyType={setJourneyType} onSave={onSaveBtnClick}/>
    );
  }

  return recordComp;
};

export default JourneyTypeListItem;
