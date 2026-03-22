import { Equipment } from '_tosslib/server/types';

export interface BookingCondition {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: Equipment[];
  preferredFloor: number | null;
}
