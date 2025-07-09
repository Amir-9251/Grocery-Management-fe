import { IconTrash, IconEdit } from "@tabler/icons-react/dist/esm/tabler-icons-react.mjs"
import type { StockEntryFormData } from "../types/Types";
import Button from "./ui/Button";


interface StockEntryProductListProps {
    products: StockEntryFormData[];
    onSubmit: () => void;
    onRemove: (index: number) => void;
    onEdit: (product: StockEntryFormData, index: number) => void; // Optional edit handler
}
const StockEntryProductList = ({ products, onSubmit, onRemove, onEdit }: StockEntryProductListProps) => {




    return (
        <div className="overflow-x-auto mb-6 rounded-lg shadow-lg bg-white p-4 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <div className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-px [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                    <thead className="sticky top-0 bg-slate-50 z-10">
                        <tr className="border-b border-slate-100">
                            <th className="px-10 py-3 text-base font-semibold text-slate-900 text-left">Code</th>
                            <th className="border-l-2 border-slate-400 border-dotted px-10 py-3 text-base font-semibold text-slate-900 text-left">ProductName</th>
                            <th className="border-l-2 border-slate-400 border-dotted px-10 py-3 text-base font-semibold text-slate-900 text-left">Quantity</th>
                            <th className="border-l-2 border-slate-400 border-dotted px-10 py-3 text-base font-semibold text-slate-900 text-left">Expire</th>
                            <th className="border-l-2 border-slate-400 border-dotted px-10 py-3 text-base font-semibold text-slate-900 text-left">Price</th>
                            <th className="border-l-2 border-slate-400 border-dotted px-10 py-3 text-base font-semibold text-slate-900 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'} hover:bg-slate-100 transition-colors`}>
                                <td className="px-10 py-2">{product.code}</td>
                                <td className="border-l-2 border-slate-400 border-dotted px-10 py-2 text-sm font-medium text-slate-900">{product.productName}</td>
                                <td className="border-l-2 border-slate-400 border-dotted px-10 py-2 text-sm font-medium text-slate-900">{product.quantity}</td>
                                <td className="border-l-2 border-slate-400 border-dotted px-10 py-2 text-sm font-medium text-slate-900">{product.ExpiryDate}</td>
                                <td className="border-l-2 border-slate-400 border-dotted px-10 py-2 text-sm font-medium text-slate-900">{product.Unitprice}</td>
                                <td className="border-l-2 border-slate-400 border-dotted px-10 py-2 text-center">
                                    <button
                                        className="p-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-lg transition-all duration-200 mr-2"
                                        aria-label={`Remove ${product.productName}`}
                                        onClick={() => onRemove(index)}
                                    >
                                        <IconTrash size={18} />
                                    </button>

                                    <button
                                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-500 hover:text-blue-700 rounded-lg transition-all duration-200"
                                        aria-label={`Edit ${product.productName}`}
                                        onClick={() => onEdit(product, index)}
                                    >
                                        <IconEdit size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button className="px-5 mt-5 ml-2 rounded-lg" type="button" onClick={onSubmit}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default StockEntryProductList;
