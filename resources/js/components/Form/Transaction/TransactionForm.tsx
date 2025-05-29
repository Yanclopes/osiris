import { Transaction, TransactionType } from '@/types/entities/Transaction';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/entities/Category';
import type { Account } from '@/types/entities/Account';
import { InertiaFormProps } from '@inertiajs/react';
import { NumericFormat } from 'react-number-format';

interface FormData {
    type: TransactionType;
    value: number;
    description: string;
    category_id: number;
    account_id: number;
}

interface TransactionFormProps {
    form: InertiaFormProps<Pick<Transaction, 'account_id' | 'type' | 'category_id' | 'description' | 'value'>>;
    categories: Category[];
    accounts: Account[];
    onSubmit: (data: FormData) => void;
    onClose: () => void;
}

export const TransactionForm = ({ form, categories, accounts, onSubmit, onClose }: TransactionFormProps) => {
    const { data, setData, errors, processing } = form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Type</label>
                <Select
                    value={data.type}
                    onValueChange={(value) => setData('type', value as TransactionType)}
                >
                    <SelectTrigger className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400">
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
                <label className="block mb-1 text-sm font-medium text-white">Category</label>
                <select
                    name="category_id"
                    value={form.data.category_id ?? ''}
                    onChange={e => form.setData('category_id', Number(e.target.value))}
                    required
                    className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-white">Account</label>
                <select
                    name="account_id"
                    value={data.account_id ?? ''}
                    onChange={e => setData('account_id', Number(e.target.value))}
                    required
                    className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                >
                    <option value={0}>Selecione uma conta</option>
                    {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                </select>
                {errors.account_id && <p className="text-red-500 text-sm mt-1">{errors.account_id}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-white">Value (R$)</label>
                <NumericFormat
                    className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                    value={form.data.value ?? ''}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    placeholder="Digite o saldo inicial"
                    onValueChange={(values) => {
                        form.setData('value', values.value === '' ? 0 : Number(values.value));
                    }}
                />
                {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-white">Description</label>
                <Input
                    type="text"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Ex: Lunch at restaurant"
                    className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
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
