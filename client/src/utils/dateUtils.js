export function formatTaskDate(dateString){
    if (!dateString) {
        return "";
    }

    const [year, month, day] = dateString.split("-").map(Number);

    const selectedDate = new Date(year, month - 1, day);

    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    const difference = (selectedDate - today) 
    / (1000 * 60 * 60 * 24);

    if (difference === 0) {
        return "Today";
    }
    if (difference === 1) {
        return "Tomorrow";
    }
    if (difference === -1) {
        return "Yesterday";
    }

    return selectedDate.toLocaleDateString(
        'en-GB', 
    {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}