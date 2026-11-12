'use client'
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

/** Copies `text` and confirms on the button itself. */
export default function CopyButton({ text, label, className = '' }: { text: string; label: string; className?: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            type="button"
            className={`pressable inline-flex items-center gap-2 cursor-pointer ${className}`}
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } catch { /* clipboard blocked: the address is on the page to select by hand */ }
            }}
        >
            {copied ? <Check className="w-4 h-4" aria-hidden /> : <Copy className="w-4 h-4" aria-hidden />}
            <span aria-live="polite">{copied ? 'Copied' : label}</span>
        </button>
    );
}
