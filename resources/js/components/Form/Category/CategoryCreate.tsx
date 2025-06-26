import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Modal } from '@/components/modal';
import { useForm } from '@inertiajs/react';
import { CategoryForm } from './CategoryForm';
import { Category } from '@/types/entities/Category';

export const CategoryCreate = () => {
    const form = useForm<Pick<Category, 'description' | 'name'>>({
        name: '',
        description: '',
    });

    return (
        <Modal
            title="New Category"
            trigger={
                <Button>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Category
                </Button>
            }
        >
            {(close) => (
                <CategoryForm
                    form={form}
                    onSubmit={() => {
                        form.post('/category', {
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
