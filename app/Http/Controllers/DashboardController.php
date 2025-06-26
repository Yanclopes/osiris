<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard', [
            'gastosPorCategoria' => $this->gastosPorCategoria(),
            'gastosPorMes' => $this->gastosPorMes(),
            'totalBalance' => $this->totalBalance(),
            'economiaComparativa' => $this->economiaComparativa(),
        ]);
    }

    private function gastosPorCategoria()
    {
        return Transaction::with('category')
            ->where('type', Transaction::Expense)
            ->whereHas('account', fn($q) => $q->where('user_id', Auth::id()))
            ->selectRaw('category_id, SUM(value) as total')
            ->groupBy('category_id')
            ->get()
            ->map(function ($item) {
                return [
                    'categoria' => $item->category->name ?? 'Sem categoria',
                    'total' => (float) $item->total,
                ];
            });
    }

    private function gastosPorMes()
    {
        $ano = Carbon::now()->year;

        $meses = collect(range(1, 12))->mapWithKeys(fn($m) => [str_pad($m, 2, '0', STR_PAD_LEFT) => 0]);

        $resultados = Transaction::where('type', Transaction::Expense)
            ->whereHas('account', fn($q) => $q->where('user_id', Auth::id()))
            ->whereYear('created_at', $ano)
            ->selectRaw("TO_CHAR(created_at, 'MM') as mes, SUM(value) as total")
            ->groupByRaw("TO_CHAR(created_at, 'MM')")
            ->orderBy('mes')
            ->get()
            ->pluck('total', 'mes');

        $gastos = $meses->merge($resultados)->map(fn($v) => (float) $v);

        return [
            'labels' => $gastos->keys()->map(fn($m) => Carbon::create()->month((int) $m)->translatedFormat('F')),
            'data' => $gastos->values(),
        ];
    }

    private function totalBalance()
    {
        return (float) Account::where('user_id', Auth::id())->sum('balance');
    }

    private function economiaComparativa()
    {
        $userId = Auth::id();

        $inicioAtual = Carbon::now()->startOfMonth();
        $fimAtual = Carbon::now()->endOfMonth();

        $inicioAnterior = Carbon::now()->subMonth()->startOfMonth();
        $fimAnterior = Carbon::now()->subMonth()->endOfMonth();

        $economiaAtual = Transaction::whereBetween('created_at', [$inicioAtual, $fimAtual])
            ->whereHas('account', fn($q) => $q->where('user_id', $userId))
            ->selectRaw("SUM(CASE WHEN type = ? THEN value ELSE 0 END) - SUM(CASE WHEN type = ? THEN value ELSE 0 END) as economia", [
                Transaction::INCOME, Transaction::Expense
            ])
            ->value('economia');

        $economiaAnterior = Transaction::whereBetween('created_at', [$inicioAnterior, $fimAnterior])
            ->whereHas('account', fn($q) => $q->where('user_id', $userId))
            ->selectRaw("SUM(CASE WHEN type = ? THEN value ELSE 0 END) - SUM(CASE WHEN type = ? THEN value ELSE 0 END) as economia", [
                Transaction::INCOME, Transaction::Expense
            ])
            ->value('economia');

        return [
            'mes_atual' => (float) $economiaAtual,
            'mes_anterior' => (float) $economiaAnterior,
            'diferenca' => (float) $economiaAtual - $economiaAnterior,
        ];
    }
}
