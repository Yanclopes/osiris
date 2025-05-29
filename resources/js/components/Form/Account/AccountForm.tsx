import { Button } from '@/components/ui/button';
import { Account } from '@/types/entities/Account';
import { InertiaFormProps } from '@inertiajs/react';
import { NumericFormat } from 'react-number-format';

interface CategoryFormProps {
    form: InertiaFormProps<Pick<Account, 'type' | 'name' | 'balance'>>;
    onSubmit: () => void;
    onClose: () => void;
    accountTypes: [number, string][]
}

export const AccountForm = ({ form, onSubmit, onClose, accountTypes }: CategoryFormProps) => (
    <form
        onSubmit={e => {
            e.preventDefault();
            onSubmit();
        }}
        className="space-y-4"
    >
        <div>
            <label className="block mb-1 text-sm font-medium text-white">Nome</label>
            <input
                className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                type="text"
                value={form.data.name ?? ''}
                onChange={e => form.setData('name', e.target.value)}
                required
                placeholder="Digite o nome da conta"
            />
        </div>

        <div>
            <label className="block mb-1 text-sm font-medium text-white">Saldo</label>
            <NumericFormat
                className="w-full border rounded-md p-2 bg-black text-white border-white placeholder-gray-400"
                value={form.data.balance ?? ''}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                placeholder="Digite o saldo inicial"
                onValueChange={(values) => {
                    form.setData('balance', values.value === '' ? 0 : Number(values.value));
                }}
            />
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium text-white">Tipo</label>
            <select
                className="w-full border rounded-md p-2 bg-black text-white border-white"
                value={form.data.type ?? ''}
                onChange={e => form.setData('type', Number(e.target.value))}
                required
            >
                <option value="0">Selecione um tipo</option>
                {Object.entries(accountTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>

        <div className="flex gap-4">
            <Button
                onClick={onClose}
                variant="destructive"
                type="reset"
                disabled={form.processing}
            >
                Cancelar
            </Button>
            <Button
                type="submit"
                variant="default"
                disabled={form.processing}
            >
                {form.processing ? 'Salvando...' : 'Salvar'}
            </Button>
        </div>
    </form>
);
