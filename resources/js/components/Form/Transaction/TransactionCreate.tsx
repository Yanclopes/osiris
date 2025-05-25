import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TransactionForm } from '@/components/Form/Transaction/TransactionForm';
import { Modal } from '@/components/modal';
import { useForm } from '@inertiajs/react';
import { TransactionType } from '@/types/entities/Transaction';
export const TransactionCreate = () => {
    const form = useForm({
        type: TransactionType.EXPENSE,
        value: '',
        description: '',
    })

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
                    onSubmit={() => {
                        form.post('/transaction', {
                            onSuccess: () => {
                                close();
                                form.reset()
                            },
                        });
                    }}
                    onClose={() => {
                        close();
                        form.reset()
                    }}
                />
            )}
        </Modal>
    )
}
