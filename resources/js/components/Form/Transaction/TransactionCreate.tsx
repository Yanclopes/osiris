import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TransactionForm } from '@/components/Form/Transaction/TransactionForm';
import { Modal } from '@/components/modal';
import { useForm } from '@inertiajs/react';
import { TransactionType } from '@/types/entities/Transaction';
import type { Category } from '@/types/entities/Category';

interface TransactionCreateProps {
    categories: Category[];
}

export const TransactionCreate = ({ categories }: TransactionCreateProps) => {
    const form = useForm({
        type: TransactionType.EXPENSE,
        value: '',
        description: '',
        category_id: '',
    });

    return (
        <Modal
            title="New Transaction"
            trigger={
                <Button>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Transaction
                </Button>
            }
        >
            {(close) => (
                <TransactionForm
                    form={form}
                    categories={categories}
                    onSubmit={() => {
                        form.post('/transaction', {
                            onSuccess: () => {
                                close();
                                form.reset();
                            },
                        });
                    }}
                    onClose={() => {
                        close();
                        form.reset();
                    }}
                />
            )}
        </Modal>
    )
}
