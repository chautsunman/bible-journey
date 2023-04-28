import JourneyType from "./journey_type";

class Settings {
  journeyTypes: JourneyType[];

  constructor(journeyTypes: JourneyType[]) {
    this.journeyTypes = journeyTypes;
  }

  isValid = () => {
    for (let i = 0; i < this.journeyTypes.length; i++) {
      if (!this.journeyTypes[i].isValid()) {
        return false;
      }
    }
    return true;
  };

  copy = () => {
    return new Settings([...this.journeyTypes]);
  };

  static newEmptyRecord = () => {
    return new Settings([]);
  };
}

export default Settings;
