import { NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;

interface CalendarModuleInterface {
  createCalendarEvent: (timeStampInSec: number, title: string) => Promise<void>;
}

export default CalendarModule as CalendarModuleInterface;
