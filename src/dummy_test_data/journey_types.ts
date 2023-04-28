import JourneyType from "../types/journey_type";

const selfType = new JourneyType('self', 'self', '#222222');
const fellowshipType = new JourneyType('fellowship', 'fellowship', '#222222');
const bsfType = new JourneyType('bsf', 'bsf', '#222222');

const journeyTypes = [
  selfType,
  fellowshipType,
  bsfType
];

export {
  selfType,
  fellowshipType,
  bsfType,
  journeyTypes
}
