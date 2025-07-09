// TableComponent.js
import React from 'react';
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

interface TableComponentProps {
    data: StockEntryFormData[];
    columns: ColumnDef<StockEntryFormData, unknown>[];
    onEdit?: (product: StockEntryFormData) => void;
    onDelete?: (id: string) => void;
    onSelect?: (product: StockEntryFormData) => void;
}

export default function ProductTable({ data, columns, onEdit, onDelete, onSelect }: TableComponentProps) {
    // Add actions column to columns
    const enhancedColumns = React.useMemo<ColumnDef<StockEntryFormData, unknown>[]>(() => [
        ...columns,


        {
            id: 'Product Expires',
            header: 'Product Expires',
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
                <div className='flex gap-4 w-full justify-end'>
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
        <div className="max-h-96 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:w-px [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
            <table className={styles.table} border={1} cellPadding={10}>
                <thead>
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
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className={styles.bodyRow} >
                            {row.getVisibleCells().map(cell => {
                                const isProductName = cell.column.id === 'productName';
                                return (<td key={cell.id} className={`${styles.bodyCell} ${isProductName ? 'cursor-pointer hover:bg-gray-100 hover:underline transition-all duration-100' : ''}`} onClick={() => isProductName && onSelect && onSelect(row.original)}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
