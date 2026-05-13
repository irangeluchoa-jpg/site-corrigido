import { X } from "lucide-react";

export function FareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const rows = [
    ["Aeroporto de Guarulhos (GRU)", "R$ 120 — 180"],
    ["Aeroporto de Congonhas (CGH)", "R$ 60 — 90"],
    ["Aeroporto de Viracopos (VCP)", "R$ 280 — 380"],
    ["Corrida urbana (km rodado)", "Bandeira 1 / Bandeira 2"],
    ["Espera (por hora)", "R$ 45"],
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 animate-rise"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-ink">Simulação de Tarifa</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Valores estimados — variam conforme trânsito, horário e ponto de origem.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-ink"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([k, v], i) => (
                <tr key={k} className={i % 2 ? "bg-muted/40" : ""}>
                  <td className="px-4 py-3 font-medium text-ink">{k}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Confirme o valor exato com o Jailson antes de embarcar. Pagamento em dinheiro, Pix ou cartão.
        </p>
      </div>
    </div>
  );
}
