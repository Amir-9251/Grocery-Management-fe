

type InventoryStatus =
    | 'out-of-stock'
    | 'expired'
    | 'expires-today'
    | 'expiring-soon'
    | 'fresh'
    | 'invalid';

interface BadgeProps {
    status: InventoryStatus;
    title: string;
}

const Badge = ({ status, title }: BadgeProps) => {
    const baseClass = 'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full';

    const statusClassMap: Record<InventoryStatus, string> = {
        'out-of-stock': 'bg-gray-100 text-gray-800 ',
        expired: 'bg-red-100 text-red-800 ',
        'expires-today': 'bg-yellow-100 text-yellow-800 ',
        'expiring-soon': 'bg-pink-100 text-pink-800 ',
        fresh: 'bg-green-100 text-green-800 ',
        invalid: 'bg-indigo-100 text-indigo-800 ',
    };

    return (
        <span className={`${baseClass} ${statusClassMap[status]}`}>
            {title}
        </span>
    );
};

export default Badge;
