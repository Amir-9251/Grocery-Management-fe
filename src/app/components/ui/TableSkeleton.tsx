interface TableSkeletonProps {
    columns: number;
    rows?: number;
    headerWidths?: string[]; // e.g. ['w-24', 'w-16', ...]
    cellWidths?: string[];   // e.g. ['w-32', 'w-16', ...]
    isShowHeader?: boolean;
}

const TableSkeleton = ({
    columns,
    rows = 4,
    headerWidths = [],
    cellWidths = [],
    isShowHeader = true
}: TableSkeletonProps) => {
    return (
        <div>
            <table className="w-full border-collapse border-spacing-0 bg-white rounded-xl overflow-hidden">
                {isShowHeader && (
                    <thead>
                        <tr className="bg-[#334155]">
                            {Array.from({ length: columns }).map((_, colIdx) => (
                                <th
                                    key={colIdx}
                                    className="py-3.5 px-[18px] font-semibold text-white text-sm uppercase text-left border-r border-slate-500"
                                >
                                    <div
                                        className={`h-4 bg-gray-300 rounded animate-pulse ${headerWidths[colIdx] || 'w-20'
                                            }`}
                                    ></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <tr
                            key={rowIdx}
                            className={rowIdx % 2 === 0 ? 'bg-[#f9fafb]' : 'bg-white'}
                        >
                            {Array.from({ length: columns }).map((_, colIdx) => {
                                // Special handling for last two cells
                                if (colIdx === columns - 2) {
                                    return (
                                        <td
                                            key={colIdx}
                                            className="py-3 px-[18px] border-b border-[#f0f0f0]"
                                        >
                                            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                                        </td>
                                    );
                                }

                                if (colIdx === columns - 1) {
                                    return (
                                        <td
                                            key={colIdx}
                                            className="py-3 px-[18px] border-b border-[#f0f0f0]"
                                        >
                                            <div className="flex gap-2">
                                                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                            </div>
                                        </td>
                                    );
                                }

                                // Default cell skeleton
                                return (
                                    <td
                                        key={colIdx}
                                        className="py-3 px-[18px] border-b border-[#f0f0f0]"
                                    >
                                        <div
                                            className={`h-4 bg-gray-200 rounded animate-pulse ${cellWidths[colIdx] || 'w-20'
                                                }`}
                                        ></div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;