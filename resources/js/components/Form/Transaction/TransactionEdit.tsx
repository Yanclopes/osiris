import { Button } from '@/components/ui/button';
import { PenIcon } from 'lucide-react';
import { TransactionForm } from '@/components/Form/Transaction/TransactionForm';
import { Modal } from '@/components/modal';
import { useForm, usePage } from '@inertiajs/react';
import { Transaction } from '@/types/entities/Transaction';
import { Category } from '@/types/entities/Category';
import { Account } from '@/types/entities/Account';

interface TransactionCreateProps {
    transaction: Transaction
}

export const TransactionEdit = ({ transaction }: TransactionCreateProps) => {
    const form = useForm<Pick<Transaction, 'account_id' | 'type' | 'category_id' | 'description' | 'value'>>({
        account_id: transaction.account_id,
        type: transaction.type,
        value: transaction.value,
        description: transaction.description,
        category_id: transaction.category_id,
    });

    const { categories, accounts } = usePage<{
        categories: Category[]
        accounts: Account[]
    }>().props

    return (
        <Modal
            title="Editar Transação"
            trigger={
                <Button>
                    <PenIcon className="w-4 h-4 mr-2" />
                    Editar
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
