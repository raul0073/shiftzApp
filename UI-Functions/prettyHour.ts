import moment from "moment"

export const prettyHour = (hours: number) => {
    const duration = moment.duration(hours, 'hours');
    const formattedHours = Math.floor(duration.asHours()).toString().padStart(2, '0');
    const formattedMinutes = Math.floor(duration.minutes()).toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}
