import { v4 as uuidv4 } from 'uuid';

class JourneyType {
  id: string;
  type: string;
  color: string;

  constructor(id: string, type: string, color: string) {
    this.id = id;
    this.type = type;
    this.color = color;
  }

  isValid = () => {
    if (!this.type) {
      return false;
    }
    return true;
  };

  toObj = () => ({
    id: this.id,
    type: this.type,
    color: this.color
  });

  copy = () => {
    return new JourneyType(this.id, this.type, this.color);
  };

  static INVALID_JOURNEY_TYPE = new JourneyType('invalidJourneyType', 'invalidJourneyType', '#000000');
  static isInvalid = (journeyType: JourneyType) => {
    return journeyType === JourneyType.INVALID_JOURNEY_TYPE || journeyType.id === 'invalidJourneyType';
  };

  static newEmptyRecord = () => {
    return new JourneyType(uuidv4(), '', '#000000');
  }

  static fromObj = (obj: any) => {
    if ((!('id' in obj)) || (!('id' in obj)) || (!('id' in obj))) {
      return JourneyType.INVALID_JOURNEY_TYPE;
    }
    return new JourneyType(obj['id'], obj['type'], obj['color']);
  };
}

export default JourneyType;
