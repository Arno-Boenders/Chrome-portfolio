'use client'
import { Printer } from 'lucide-react';

export default function PrintButton({ className }: { className?: string }) {
    return (
        <button type="button" className={className} onClick={() => window.print()}>
            <Printer className="w-4 h-4" aria-hidden />Print
        </button>
    );
}
