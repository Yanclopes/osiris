import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';

interface ModalProps {
    title: string;
    trigger: ReactNode;
    children: (close: () => void) => ReactNode;
}

export function Modal({ trigger, title, children }: ModalProps) {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children(close)}
            </DialogContent>
        </Dialog>
    );
}
