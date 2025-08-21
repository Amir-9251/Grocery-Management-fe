import React, { useState } from 'react';
import { IconKeyboard, IconX, IconInfoCircle } from '@tabler/icons-react';

const KeyboardShortcutsHelp: React.FC = () => {
    const [showHelp, setShowHelp] = useState(false);

    const shortcuts = [
        { key: 'Ctrl + B', description: 'Toggle barcode scanner mode' },
        { key: 'Ctrl + P', description: 'Process sale (if cart has items)' },
        { key: 'Ctrl + C', description: 'Clear cart' },
        { key: 'Enter', description: 'Search/Scan barcode (in respective modes)' },
        { key: 'Esc', description: 'Close modals' },
    ];

    return (
        <>
            <button
                onClick={() => setShowHelp(true)}
                className="fixed bottom-4 right-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors z-40"
                title="Keyboard Shortcuts"
            >
                <IconKeyboard size={20} />
            </button>

            {showHelp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <IconKeyboard size={24} />
                                    Keyboard Shortcuts
                                </h2>
                                <button
                                    onClick={() => setShowHelp(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {shortcuts.map((shortcut, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-600">{shortcut.description}</span>
                                        <div className="flex items-center gap-1">
                                            {shortcut.key.split(' + ').map((key, keyIndex) => (
                                                <React.Fragment key={keyIndex}>
                                                    <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-800">
                                                        {key}
                                                    </kbd>
                                                    {keyIndex < shortcut.key.split(' + ').length - 1 && (
                                                        <span className="text-gray-400 text-xs">+</span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <IconInfoCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-medium mb-1">Pro Tips:</p>
                                        <ul className="space-y-1 text-xs">
                                            <li>• Use barcode mode for faster product entry</li>
                                            <li>• Add individual discounts to cart items</li>
                                            <li>• Apply global discounts before processing</li>
                                            <li>• Scan products by clicking the input field in scan mode</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default KeyboardShortcutsHelp; 