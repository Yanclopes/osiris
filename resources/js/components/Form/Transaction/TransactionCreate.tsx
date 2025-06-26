import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TransactionForm } from '@/components/Form/Transaction/TransactionForm';
import { Modal } from '@/components/modal';
import { useForm } from '@inertiajs/react';
import { Transaction, TransactionType } from '@/types/entities/Transaction';
import type { Category } from '@/types/entities/Category';
import type { Account } from '@/types/entities/Account';

interface TransactionCreateProps {
    categories: Category[];
    accounts: Account[];
}

export const TransactionCreate = ({ categories, accounts }: TransactionCreateProps) => {
    const form = useForm<Pick<Transaction, 'account_id' | 'type' | 'category_id' | 'description' | 'value'>>({
        account_id: 0,
        type: TransactionType.EXPENSE,
        value: 0,
        description: '',
        category_id: 0,
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
                    accounts={accounts}
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
