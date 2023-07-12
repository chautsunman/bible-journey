import SettingsService from "../services/settings_service";
import JourneyService from "../services/journey_service";
import SummaryService from "../services/summary_service";

class AppContext {
  settingsService: SettingsService;
  journeyService: JourneyService;
  summaryService: SummaryService;

  constructor(uid: string, settingsService: SettingsService, journeyService: JourneyService, summaryService: SummaryService) {
    this.settingsService = settingsService;
    this.journeyService = journeyService;
    this.summaryService = summaryService;

    this.settingsService.init(uid);
    this.journeyService.init(uid);
    this.summaryService.init(uid);
  }
}

export default AppContext;
