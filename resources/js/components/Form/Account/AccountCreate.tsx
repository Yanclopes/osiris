import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Modal } from '@/components/modal';
import { useForm } from '@inertiajs/react';
import { AccountForm } from './AccountForm';
import { Account } from '@/types/entities/Account';

interface AccountCreateProps
{
    accountTypes: [number, string][]
}
export const AccountCreate = ({ accountTypes }: AccountCreateProps) => {
    const form = useForm<Pick<Account, 'type' | 'name' | 'balance'>>({
        name: '',
        type: 0,
        balance: 0,
    });

    return (
        <Modal
            title="New Account"
            trigger={
                <Button>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Account
                </Button>
            }
        >
            {(close) => (
                <AccountForm
                    form={form}
                    accountTypes={accountTypes}
                    onSubmit={() => {
                        form.post('/account', {
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
    );
};
