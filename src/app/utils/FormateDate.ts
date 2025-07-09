export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' }); // 'July'
    const year = date.getFullYear();

    return `${day} ${month} ${year}`; // e.g., "30 July 2025"
}