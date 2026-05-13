import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Phone, Calculator, MessageCircle, MapPin, Clock, Star, PenLine } from "lucide-react";
import heroImg from "@/assets/jailson-hero.jpg";
import canetaImg from "@/assets/caneta.jpg";
import { FareModal } from "@/components/FareModal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jailson Taxista — Seu motorista de confiança em São Paulo" },
      {
        name: "description",
        content:
          "Reserve uma corrida com Jailson Taxista: aeroportos, viagens e corridas urbanas em São Paulo. Atendimento 24h.",
      },
    ],
  }),
});

const DESTINOS = [
  "Aeroporto de Guarulhos",
  "Aeroporto de Congonhas",
  "Aeroporto de Viracopos",
  "Centro de São Paulo",
  "Outro destino",
];

const CONTATOS = [
  { op: "Claro", num: "(11) 9 1234-5678" },
  { op: "Vivo", num: "(11) 9 8765-4321" },
  { op: "Tim", num: "(11) 9 5555-1010" },
  { op: "EUA", num: "+1 (305) 555-0199" },
];

const LINKS_HISTORICOS = [
  { label: "Blog Jailson 2008", href: "#" },
  { label: "Diário do Taxista (2011)", href: "#" },
  { label: "Crônicas da Marginal", href: "#" },
  { label: "Arquivo de Fotos Antigas", href: "#" },
];

function useSaudacao() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    if (!now) return { saudacao: "Olá", data: "21/11/111" };
    const h = now.getHours();
    const saudacao = h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
    // Homenagem ao original: data com erro proposital
    return { saudacao, data: "21/11/111" };
  }, [now]);
}

function Index() {
  const [destino, setDestino] = useState(DESTINOS[0]);
  const [nome, setNome] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { saudacao, data } = useSaudacao();

  const whatsappLink = useMemo(() => {
    const msg = `Olá Jailson, ${nome ? `aqui é ${nome}, ` : ""}gostaria de agendar uma corrida para o ${destino}.`;
    return `https://wa.me/5511912345678?text=${encodeURIComponent(msg)}`;
  }, [destino, nome]);

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#topo" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-taxi font-extrabold text-ink shadow-glow">
              JT
            </span>
            <span className="text-lg font-bold tracking-tight">Jailson Taxista</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#reserva" className="transition hover:text-ink">Reservar</a>
            <a href="#contatos" className="transition hover:text-ink">Contatos</a>
            <a href="#video" className="transition hover:text-ink">Vídeo</a>
            <a href="#identidade" className="transition hover:text-ink">Identidade</a>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="topo" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {saudacao}, hoje é {data}
            </p>
            <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Seu taxista de confiança em <span className="bg-gradient-taxi bg-clip-text text-transparent">São Paulo</span>.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Aeroportos, viagens e corridas urbanas com pontualidade, conforto
              e o sorriso do Jailson. Atendimento 24 horas, todos os dias.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#reserva"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-taxi px-5 py-3 text-sm font-bold text-ink shadow-glow transition hover:-translate-y-0.5"
              >
                Reservar agora
              </a>
              <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-ink transition hover:bg-muted"
              >
                <Calculator size={16} /> Simular tarifa
              </button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 text-sm">
              {[
                { k: "+30", v: "Anos de estrada" },
                { k: "24/7", v: "Disponível" },
                { k: "5.0", v: "Avaliação média" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-extrabold text-ink">{s.k}</dt>
                  <dd className="text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative animate-rise">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-taxi opacity-30 blur-2xl" />
            <img
              src={heroImg}
              alt="Jailson, taxista paulistano, ao lado do seu táxi amarelo"
              width={1536}
              height={1024}
              className="relative w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* RESERVA */}
      <section id="reserva" className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Reservar uma corrida</h2>
            <p className="mt-2 text-muted-foreground">
              Escolha o destino e mande sua mensagem direto no WhatsApp do Jailson.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-soft md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-ink">Seu nome</span>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como devo te chamar?"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-taxi-deep focus:ring-2 focus:ring-taxi/40"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">Destino</span>
                <select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-taxi-deep focus:ring-2 focus:ring-taxi/40"
                >
                  {DESTINOS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Mensagem pronta: <span className="text-ink">"Olá Jailson, gostaria de agendar uma corrida para o {destino}"</span>
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-taxi px-5 py-3 text-sm font-bold text-ink shadow-glow transition hover:-translate-y-0.5"
              >
                <MessageCircle size={16} /> Enviar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATOS */}
      <section id="contatos" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Todos os contatos</h2>
              <p className="mt-2 text-muted-foreground">Ligue, mande SMS ou chame em qualquer operadora.</p>
            </div>
            <Star className="hidden text-taxi md:block" size={28} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTATOS.map((c) => (
              <a
                key={c.op}
                href={`tel:${c.num.replace(/\D/g, "")}`}
                className="group rounded-xl border border-border bg-background p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-taxi text-ink shadow-glow">
                    <Phone size={18} />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.op}
                  </span>
                </div>
                <p className="mt-4 text-lg font-bold text-ink">{c.num}</p>
                <p className="mt-1 text-xs text-muted-foreground transition group-hover:text-ink">
                  Toque para ligar →
                </p>
              </a>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { Icon: MapPin, t: "Cobertura", d: "Toda a Grande SP e cidades do interior" },
              { Icon: Clock, t: "Plantão", d: "24 horas, inclusive feriados" },
              { Icon: Star, t: "Conforto", d: "Carro com ar, água e wifi" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-muted/30 p-5">
                <Icon size={20} className="text-taxi-deep" />
                <p className="mt-3 font-semibold text-ink">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">O vídeo clássico</h2>
            <p className="mt-2 text-muted-foreground">
              Um clássico do Jailson, preservado em alta definição.
            </p>
          </div>
          <div className="relative rounded-3xl bg-ink p-3 shadow-soft">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Vídeo Clássico do Jailson Taxista"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* IDENTIDADE - CANETA */}
      <section id="identidade" className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-taxi opacity-20 blur-2xl" />
            <img
              src={canetaImg}
              alt="A famosa Caneta Caneta — identidade do Jailson"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative mx-auto w-full max-w-md rounded-3xl object-cover shadow-soft"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <PenLine size={14} /> Nossa Identidade
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              A Caneta Caneta
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Mais que um instrumento de trabalho, a caneta do Jailson é símbolo
              de cada recibo assinado, cada agenda preenchida e cada cliente que
              virou amigo. Um pequeno objeto que carrega décadas de estrada.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink">
              {["Marca registrada desde 1991", "Sempre no bolso da camisa", "Já assinou milhares de corridas"].map(
                (i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-taxi" /> {i}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-ink text-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-taxi font-extrabold text-ink">
                JT
              </span>
              <span className="text-lg font-bold">Jailson Taxista</span>
            </div>
            <p className="mt-4 text-sm text-background/70">
              Desde 1991 levando você com segurança por São Paulo e além.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/60">
              Links históricos
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {LINKS_HISTORICOS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-background/80 transition hover:text-taxi">
                    → {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-background/60">Fale agora</h4>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-taxi px-4 py-3 text-sm font-bold text-ink"
            >
              <MessageCircle size={16} /> WhatsApp do Jailson
            </a>
          </div>
        </div>
        <div className="border-t border-background/10">
          <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-background/50">
            © {new Date().getFullYear()} Jailson Taxista. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <FareModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
