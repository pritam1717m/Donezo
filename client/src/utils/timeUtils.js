export function formatTaskTime(timeString){
    if (!timeString) {
        return "";
    }

    const [hours, minutes] = timeString.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
        hour: 'numeric',
        minute: "2-digit"
    });
}