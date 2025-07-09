type InventoryStatus =
    | 'out-of-stock'
    | 'expired'
    | 'expires-today'
    | 'expiring-soon'
    | 'fresh'
    | 'invalid';

interface InventoryStatusResult {
    status: InventoryStatus;
    label: string;
}

function getDaysUntilExpiry(expiryDateStr: string | null | undefined): number | null {
    if (!expiryDateStr) return null;

    const today = new Date();
    const expiry = new Date(expiryDateStr);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

export function getInventoryStatus(
    expiryDateStr: string | null | undefined,
    quantity: number
): InventoryStatusResult {
    if (quantity <= 0) {
        return { status: 'out-of-stock', label: 'Out of Stock' };
    }
    console.log("expiryDateStr::", expiryDateStr, "quantity::", quantity);

    const days = getDaysUntilExpiry(expiryDateStr);

    if (days === null) return { status: 'invalid', label: 'Invalid Date' };
    if (days < 0) return { status: 'expired', label: 'Expired' };
    if (days === 0) return { status: 'expires-today', label: 'Expires Today' };
    if (days <= 3) return { status: 'expiring-soon', label: `${days} days left` };

    return { status: 'fresh', label: `${days} days left` };
}
