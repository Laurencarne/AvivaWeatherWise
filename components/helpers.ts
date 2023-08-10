import { DateTime } from "luxon";

/**
 * Returns the timestamp formatted for the astological times.
 * example: 5:33 am or 8:42 pm
 *
 * The timestamp being returned from weatherApi is formatted unusually
 * hour padded to 2:minute padded to 2 meridiem: 08:42 PM
 */
export function getTimestamp(time: string) {
  const formattedTime = DateTime.fromFormat(time.replace(":", " "), "hh mm a");
  return formattedTime.isValid
    ? formattedTime.toLocaleString(DateTime.TIME_SIMPLE)
    : "--";
}

/**
 * Returns a string with the UV index
 * and additional user friendly level guidance.
 */
export function getUVIndex(index: number) {
  if (index <= 2) {
    return `${index} (Low)`;
  } else if (index <= 5) {
    return `${index} (Moderate)`;
  } else if (index <= 7) {
    return `${index} (High)`;
  } else if (index <= 10) {
    return `${index} (Very High)`;
  } else if (index > 10) {
    return `${index} (Extreme)`;
  } else {
    return `${index}`;
  }
}
