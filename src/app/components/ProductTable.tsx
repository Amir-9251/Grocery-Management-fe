import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, Row } from '@tanstack/react-table';
import styles from './ProductTable.module.css';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import type { StockEntryFormData } from '../types/Types';
import Badge from './ui/Badge';
import { getInventoryStatus } from '../utils/getBadgeStatus';
import TableSkeleton from './ui/TableSkeleton';

interface TableComponentProps {
    data: StockEntryFormData[];
    columns: ColumnDef<StockEntryFormData, unknown>[];
    onEdit?: (product: StockEntryFormData) => void;
    onDelete?: (id: string) => void;
    onSelect?: (product: StockEntryFormData) => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
}

export default function ProductTable({
    data,
    columns,
    onEdit,
    onDelete,
    onSelect,
    onLoadMore,
    hasMore = false,
    loading = false
}: TableComponentProps) {
    const observerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [previousDataLength, setPreviousDataLength] = useState(0);
    const [newRowsCount, setNewRowsCount] = useState(0);

    // Track when new data is added for animation
    useEffect(() => {
        if (data.length > previousDataLength) {
            setNewRowsCount(data.length - previousDataLength);
            setPreviousDataLength(data.length);

            // Reset new rows count after animation
            setTimeout(() => {
                setNewRowsCount(0);
            }, 1000);
        } else if (data.length < previousDataLength) {
            setPreviousDataLength(data.length);
        }
    }, [data.length, previousDataLength]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !loading && onLoadMore) {
            onLoadMore();
        }
    }, [hasMore, loading, onLoadMore]);

    useEffect(() => {
        const element = observerRef.current;
        const container = containerRef.current;
        if (!element || !container) return;

        const observer = new IntersectionObserver(handleObserver, {
            root: container, // Use the scrollable container as root
            rootMargin: '20px',
            threshold: 1.0,
        });

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
            observer.disconnect();
        };
    }, [handleObserver]);

    // Add actions column to columns
    const enhancedColumns = React.useMemo<ColumnDef<StockEntryFormData, unknown>[]>(() => [
        ...columns,

        {
            id: 'Product Expires',
            header: 'Product Expires',
            accessorKey: 'ExpiryDate',
            cell: ({ row }: { row: Row<StockEntryFormData> }) => (
                <div className='flex gap-4 w-full justify-start'>
                    <Badge
                        status={getInventoryStatus(row.original.ExpiryDate, row.original.quantity).status}
                        title={getInventoryStatus(row.original.ExpiryDate, row.original.quantity).label}
                    />
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }: { row: Row<StockEntryFormData> }) => (
                <div className='flex gap-4 w-full justify-start'>
                    <button
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 rounded-lg transition-all duration-200"
                        title="Edit"
                        onClick={() => onEdit && onEdit(row.original)}
                    >
                        <IconEdit size={18} />
                    </button>
                    <button
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 rounded-lg transition-all duration-200"
                        title="Delete"
                        onClick={() => onDelete && row.original._id && onDelete(row.original._id)}
                    >
                        <IconTrash size={18} />
                    </button>
                </div>
            ),
        },
    ], [columns, onEdit, onDelete]);

    const table = useReactTable({
        data,
        columns: enhancedColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            <div
                ref={containerRef}
                className="overflow-y-auto max-h-[430px] rounded-xl border border-gray-200 shadow-md [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
                <table className={styles.table} border={1} cellPadding={10}>
                    <thead className="sticky top-0 bg-white z-10">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className={styles.headerRow}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className={styles.headerCell}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => {
                            const isNewRow = index >= data.length - newRowsCount && newRowsCount > 0;
                            return (
                                <tr
                                    key={row.id}
                                    className={`${styles.bodyRow} table-row-transition ${isNewRow
                                        ? 'animate-fadeIn bg-green-50/30 border-l-4 border-l-green-400'
                                        : 'bg-white'
                                        }`}
                                    style={{
                                        animationDelay: isNewRow ? `${(data.length - index - 1) * 150}ms` : '0ms'
                                    }}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        const isProductName = cell.column.id === 'productName';
                                        return (
                                            <td
                                                key={cell.id}
                                                className={`${styles.bodyCell} ${isProductName ? 'cursor-pointer hover:bg-gray-100 hover:underline transition-all duration-100' : ''}`}
                                                onClick={() => isProductName && onSelect && onSelect(row.original)}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Infinite Scroll Observer */}
                <div
                    ref={observerRef}
                    className="flex items-center justify-center py-4 bg-gray-50 transition-all duration-300"
                >
                    {loading ? (
                        <div className="animate-fadeIn w-full">
                            <TableSkeleton columns={5} rows={3} isShowHeader={false} />
                        </div>
                    ) : hasMore ? (
                        <div className="text-gray-600 text-sm animate-pulse font-medium">Scroll to load more products...</div>
                    ) : (
                        <div className="text-gray-500 text-sm">✨ All products loaded</div>
                    )}
                </div>
            </div>
        </div>
    );
}
