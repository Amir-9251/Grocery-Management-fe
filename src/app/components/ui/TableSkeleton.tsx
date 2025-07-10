interface TableSkeletonProps {
    columns?: [number];
}

const TableSkeleton = () => {
    return (
        <div className=" ">
            <table className="w-full border-collapse border-spacing-0 bg-white rounded-xl overflow-hidden">
                <thead>
                    <tr className="bg-[#334155]">
                        <th className="py-3.5 px-[18px] font-semibold text-white text-sm uppercase text-left border-r border-slate-500 ">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
                        </th>
                        <th className="py-3.5 px-[18px] font-semibold text-white text-sm uppercase text-left  border-r border-slate-500">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-16"></div>
                        </th>
                        <th className="py-3.5 px-[18px] font-semibold text-white text-sm uppercase text-left border-r border-slate-500 ">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4].map((index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-[#f9fafb]' : 'bg-white'}>
                            <td className="py-3 px-[18px] border-b border-[#f0f0f0]">
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                            </td>
                            <td className="py-3 px-[18px] border-b border-[#f0f0f0]">
                                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                            </td>
                            <td className="py-3 px-[18px] border-b border-[#f0f0f0]">
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSkeleton