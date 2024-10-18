export type EventBasicInfoType = {
  eventBanner: string;
  thumbnail: string;
  eventName: string;
  eventDescription: string;
};

/* ----------------------*/

export type EventCategoryType = {
  eventCategory: string[];
};

/* ----------------------*/

type OneTimeType = {
  startDate: Date;
  startTime: string;
  timeZone: string;
  endTime: string;
  endDate: Date;
};

export type OneTimeEventType = {
  eventType: string;
  oneTimeEvent: OneTimeType;
};

/* ----------------------*/

type RecurringType = {
  scheduleReference: string;
  startDate: Date;
  startTime: string;
  timeZone: string;
  endTime: string;
  endDate: Date;
};

export type RecurringEventType = {
  eventType: string;
  recurringEvent: RecurringType;
};
