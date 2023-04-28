import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import RecordCard from './record_card';
import EditRecordCard from './edit_record_card';

import JourneyRecord from '../types/journey_record';
import JourneyType from '../types/journey_type';
import { RecordsFilter } from '../types/records_filter';
import AppContext from '../app_components/app_context';
import Settings from '../types/settings';
import { Subscriber } from '../services/subscription';

interface JourneyRecordsPageProps {
  appContext: AppContext;
  recordsFilter: RecordsFilter;
}

const JourneyRecordsPage = (props: JourneyRecordsPageProps) => {
  const {appContext, recordsFilter} = props;

  const { enqueueSnackbar } = useSnackbar();

  const [journeyRecords, setJourneyRecords] = useState<JourneyRecord[]>([]);
  const [newJourneyRecord, setNewJourneyRecord] = useState(JourneyRecord.newEmptyRecord());
  const [journeyTypes, setJourneyTypes] = useState<JourneyType[]>([]);

  const onNewRecordChange = useCallback((journeyRecord: JourneyRecord) => {
    setNewJourneyRecord(journeyRecord);
  }, [setNewJourneyRecord]);

  const onResetNewRecord = useCallback(() => {
    console.log('onResetNewRecord');
    setNewJourneyRecord(JourneyRecord.newEmptyRecord());
  }, [setNewJourneyRecord]);

  const onSaveNewRecord = useCallback(async () => {
    if (!newJourneyRecord.isValid()) {
      console.log('onSaveNewRecord - invalid record');
      enqueueSnackbar('Invalid record to save', {variant: 'error'});
      return;
    }
    console.log(`onSaveNewRecord - save start`);
    const res = await appContext.journeyService.addJourney(newJourneyRecord);
    console.log(`onSaveNewRecord - save end, ${res}`);
    if (res) {
      enqueueSnackbar('Saved', {variant: 'success'});
    } else {
      enqueueSnackbar('Save error.', {variant: 'error'});
    }
    onResetNewRecord();
  }, [newJourneyRecord, appContext, onResetNewRecord, enqueueSnackbar]);

  useEffect(() => {
    (async () => {
      const bookChapterFilter = recordsFilter.bookChapterFilter;
      if (!bookChapterFilter) {
        console.log('JourneyRecordsPage search - no filters');
        return;
      }
      if (!bookChapterFilter.isValid()) {
        console.log('JourneyRecordsPage search - invalid bookChapterFilter');
        return;
      }
      console.log(`JourneyRecordsPage search - get journeys start, ${bookChapterFilter.toString()}`);
      const journeys = await appContext.journeyService.getJourneysForBookChapter(bookChapterFilter);
      setJourneyRecords(journeys);
      console.log(`JourneyRecordsPage search - get journeys end, ${bookChapterFilter.toString()}, journeys: ${journeys.length}`);
    })();
  }, [appContext, recordsFilter]);

  const onSettingsUpdate: Subscriber<Settings> = useMemo(() => ({
    onData: (data) => {
      console.log('onSettingsUpdate - onData', data);
      setJourneyTypes(data.journeyTypes);
    }
  }), [setJourneyTypes]);

  useEffect(() => {
    appContext.settingsService.subscribe(onSettingsUpdate);
    return () => {
      appContext.settingsService.unsubscribe(onSettingsUpdate);
    };
  }, [appContext, onSettingsUpdate]);

  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        <EditRecordCard
          record={newJourneyRecord}
          onChange={onNewRecordChange}
          possibleTypes={journeyTypes}
          onSave={onSaveNewRecord}
          onReset={onResetNewRecord}/>
      </Box>
      {journeyRecords.map(record => (
        <Box key={record.id} sx={{
          mb: 1
        }}>
          <RecordCard record={record}/>
        </Box>
      ))}
    </Box>
  );
};

export default JourneyRecordsPage;
