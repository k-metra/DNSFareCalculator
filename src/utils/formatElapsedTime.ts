export default function formatElapsedTime(timestamp: number) {
    const now = Date.now();
    const elapsedMs = now - timestamp;

    const minutes = Math.floor(elapsedMs / 60000);
    const hours = Math.floor(elapsedMs / 3600000);
    const days = Math.floor(elapsedMs / 86400000);

    if (minutes < 1) {
        return "Just now";
    } else if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (hours < 24) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
}