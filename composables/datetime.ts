import { computed } from "vue";
import { useNow } from "@vueuse/core";
import {
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDistanceStrict,
  formatISO,
  isThisYear,
} from "date-fns";
import type { Urgency } from "~~/types";

const now = useNow({ interval: 1000 });

export const formatDate = (datetime: Date | string | null) => {
  return datetime
    ? format(
        new Date(datetime),
        isThisYear(new Date(datetime)) ? "d.MMM" : "d.MM.y",
      )
    : "";
};

export const formatTime = (datetime: Date | string | null) => {
  return datetime ? format(new Date(datetime), "HH:mm") : "";
};

export const formatDatetimePrecise = (datetime: Date | null) => {
  return datetime ? format(new Date(datetime), "HH:mm:ss") : "";
};

export const formatDatetime = (datetime: Date | string | null) => {
  return datetime
    ? `${formatDate(new Date(datetime))} ${formatTime(datetime)}`
    : null;
};

export const useFormattedDistance = (datetime: Date | string) => {
  return computed(() => {
    const distance = sentenceCase(
      formatDistanceStrict(new Date(datetime), now.value, {
        roundingMethod: "round",
        addSuffix: true,
      }),
    );
    return distance;
  });
};

export const useUrgency = (fromDateTime: Date, toDateTime: Date | null) => {
  return computed<Urgency>(() => {
    const soonSeconds = 3 * 60 * 60;
    const started = differenceInSeconds(fromDateTime, now.value);
    const ended = toDateTime ? differenceInSeconds(toDateTime, now.value) : 0;
    if (toDateTime === null) {
      return "permanent";
    } else if (started <= 0 && ended >= 0) {
      return "now";
    } else if (started >= 0 && started <= soonSeconds) {
      return "soon";
    } else if (started >= 0 && started > soonSeconds) {
      return "future";
    } else {
      return "past";
    }
  });
};

export const useDatetime = (
  startAt: Date | string,
  endAt: Date | string | undefined,
) => {
  const startAtDatetime = new Date(startAt);
  const endAtDatetime = endAt ? new Date(endAt) : null;

  const formattedStartAtDate = formatDate(startAtDatetime);
  const formattedStartAtTime = formatTime(startAtDatetime);
  const formattedEndAtDate = formatDate(endAtDatetime);
  const formattedEndAtTime = formatTime(endAtDatetime);
  const formattedStartAtDistance = useFormattedDistance(startAtDatetime);
  const urgency = useUrgency(startAtDatetime, endAtDatetime);

  const isSameDay = formattedStartAtDate === formattedEndAtDate;

  const formattedDatetimeFirst = isSameDay
    ? `${formattedStartAtDate} ${formattedStartAtTime}-${formattedEndAtTime}`
    : `${formattedStartAtDate}`;

  const formattedDatetimeSecond = isSameDay ? null : `${formattedEndAtDate}`;

  return {
    formattedStartAtDate,
    formattedStartAtTime,
    formattedEndAtDate,
    formattedEndAtTime,
    formattedStartAtDistance,
    urgency,
    formattedDatetimeFirst,
    formattedDatetimeSecond,
  };
};

export const today = () => formatISO(new Date(), { representation: "date" });

export const formatLongDatetime = (str: string) =>
  format(new Date(str), "dd.LL.yyyy HH:mm:ss z");
