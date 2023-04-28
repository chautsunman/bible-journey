import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import BibleReader from './components/bible_reader';
import JourneySummaryCard from './components/journey_summary_card';
import RecordCard from './components/record_card';
import EditRecordCard from './components/edit_record_card';

import JourneyRecord from './types/journey_record';
import JourneyType from './types/journey_type';
import { Book, BookChapter } from './bible/constants';
import AppContext from './app_components/app_context';
import Settings from './types/settings';
import { Subscriber } from './services/subscription';

interface HomePageProps {
  appContext: AppContext;
}

const Home = (props: HomePageProps) => {
  const {appContext} = props;

  const { enqueueSnackbar } = useSnackbar();

  const [journeyRecords, setJourneyRecords] = useState<JourneyRecord[]>([]);
  const [newJourneyRecord, setNewJourneyRecord] = useState(JourneyRecord.newEmptyRecord());
  const [journeyTypes, setJourneyTypes] = useState<JourneyType[]>([]);

  const onSelectBookChapter = async (bookChapter: BookChapter) => {
    if (!bookChapter.isValid()) {
      console.log('onSelectBookChapter - invalid bookChapter');
      return;
    }
    console.log(`onSelectBookChapter - get journeys start, ${bookChapter.toString()}`);
    const journeys = await appContext.journeyService.getJourneysForBookChapter(bookChapter);
    setJourneyRecords(journeys);
    console.log(`onSelectBookChapter - get journeys end, ${bookChapter.toString()}, journeys: ${journeys.length}`);
  }

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
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{mb: 2}}>
            <BibleReader/>
          </Box>

          <Box>
            <JourneySummaryCard onSelectBookChapter={onSelectBookChapter}/>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h5">Journey Records</Typography>
          </Box>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
