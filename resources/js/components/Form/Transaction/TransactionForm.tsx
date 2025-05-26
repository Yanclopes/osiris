import { TransactionType } from '@/types/entities/Transaction';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/entities/Category';

interface FormData {
    type: TransactionType;
    value: string;
    description: string;
    category_id: string;  // ✅ Adicionado
}

interface TransactionFormProps {
    form: {
        data: FormData;
        setData: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
        errors: Partial<Record<keyof FormData, string>>;
        processing: boolean;
    };
    categories: Category[];   // ✅ Receber as categorias
    onSubmit: (data: FormData) => void;
    onClose: () => void;
}

export const TransactionForm = ({ form, categories, onSubmit, onClose }: TransactionFormProps) => {
    const { data, setData, errors, processing } = form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 text-sm font-medium">Type</label>
                <Select
                    value={data.type}
                    onValueChange={(value) => setData('type', value as TransactionType)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                        <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Category</label>
                <Select
                    value={data.category_id}
                    onValueChange={(value) => setData('category_id', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={String(category.id)}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Value (R$)</label>
                <Input
                    type="text"
                    inputMode="decimal"
                    value={data.value}
                    onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        const formatted = (Number(raw) / 100).toFixed(2).replace('.', ',');
                        setData('value', formatted);
                    }}
                    placeholder="0,00"
                />
                {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <Input
                    type="text"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Ex: Lunch at restaurant"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="flex gap-4">
                <Button
                    onClick={onClose}
                    variant="destructive"
                    type="reset"
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="default"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    )
}
