import { Button } from '@/components/ui/button';
import { InertiaFormProps } from '@inertiajs/react';
import { Category } from '@/types/entities/Category';

interface CategoryFormProps {
    form: InertiaFormProps<Pick<Category, 'description' | 'name'>>;
    onSubmit: () => void;
    onClose: () => void;
}

export const CategoryForm = ({ form, onSubmit, onClose }: CategoryFormProps) => (
    <form
        onSubmit={e => {
            e.preventDefault();
            onSubmit();
        }}
        className="space-y-4"
    >
        <div>
            <label className="block mb-1 text-sm font-medium text-white">Name</label>
            <input
                className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                type="text"
                value={String(form.data.name ?? '')}
                onChange={e => form.setData('name', e.target.value)}
                required
                placeholder="Digite o nome da categoria"
            />
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium text-white">Description</label>
            <input
                className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                type="text"
                value={String(form.data.description ?? '')}
                onChange={e => form.setData('description', e.target.value)}
                placeholder="Digite uma descrição"
            />
        </div>
        <div className="flex gap-4">
            <Button
                onClick={onClose}
                variant="destructive"
                type="reset"
                disabled={form.processing}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                variant="default"
                disabled={form.processing}
            >
                {form.processing ? 'Saving...' : 'Save'}
            </Button>
        </div>
    </form>
);
