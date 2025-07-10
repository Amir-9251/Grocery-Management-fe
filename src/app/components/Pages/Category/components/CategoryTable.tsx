// TableComponent.js
import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, Row } from '@tanstack/react-table';
import styles from '../../../ProductTable.module.css';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import type { CategoryFormData } from '../../../../types/Types';
import Badge from '../../../ui/Badge';


interface TableComponentProps {
    data: CategoryFormData[];
    columns: ColumnDef<CategoryFormData, unknown>[];
    onEdit?: (category: CategoryFormData) => void;
    onDelete?: (id: string) => void;
}

export default function CategoryTable({ data, columns, onEdit, onDelete }: TableComponentProps) {
    // Add actions column to columns
    const enhancedColumns = React.useMemo<ColumnDef<CategoryFormData, unknown>[]>(() => [
        ...columns,
        {
            id: 'status',
            header: 'Status',
            cell: ({ row }: { row: Row<CategoryFormData> }) => (
                <div className='flex gap-4 w-full justify-start'>
                    {row.original.status ? (
                        <Badge status="fresh" title="active" />
                    ) : (
                        <Badge status="expired" title="inactive" />
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }: { row: Row<CategoryFormData> }) => (
                <div className='flex gap-2 w-full justify-start'>
                    <button
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 rounded-lg transition-all duration-200"
                        title="Edit"
                        onClick={() => onEdit && onEdit(row.original)}
                    >
                        <IconPencil size={18} />
                    </button>
                    <button
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 rounded-lg transition-all duration-200"
                        title="Delete"
                        onClick={() => {
                            if (onDelete && row.original._id) {
                                onDelete(row.original._id);
                            }
                        }}
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
            <table className={styles.table} border={1} cellPadding={10} >
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
                        <tr key={row.id} className={styles.bodyRow}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={styles.bodyCell}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
