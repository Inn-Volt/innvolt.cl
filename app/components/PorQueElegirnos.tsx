import { ShieldCheck, Clock, FileCheck, Wrench, Star, MessageCircle } from 'lucide-react';

const GARANTIAS = [
  {
    icon: ShieldCheck,
    titulo: 'Certificación SEC',
    desc: 'Todos nuestros trabajos cumplen la normativa eléctrica chilena. Emitimos certificados TE1 y gestionamos los trámites ante la SEC.',
  },
  {
    icon: Clock,
    titulo: 'Respuesta en menos de 24 hrs',
    desc: 'Cotizamos y coordinamos tu proyecto dentro del día hábil siguiente a tu solicitud.',
  },
  {
    icon: FileCheck,
    titulo: 'Presupuesto sin costo',
    desc: 'Te entregamos una propuesta técnica detallada y sin compromiso. Sin letra chica ni cobros ocultos.',
  },
  {
    icon: Wrench,
    titulo: 'Garantía en materiales y mano de obra',
    desc: 'Respaldamos cada instalación con garantía real. Si algo falla por nuestra parte, lo resolvemos.',
  },
];

export default function PorQueElegirnos() {
  return (
    <section id="garantias" className="py-16 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h2 className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-[0.5em]">Sin inventos</h2>
          <h3 className="text-4xl md:text-6xl font-black text-[#1e293b] tracking-tighter italic uppercase">
            ¿Por qué <span className="text-[#ffc600]">elegirnos?</span>
          </h3>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
            No necesitamos inventar reseñas. Estos son nuestros compromisos concretos en cada proyecto.
          </p>
        </div>

        {/* Cards garantías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-16 md:mb-24">
          {GARANTIAS.map(({ icon: Icon, titulo, desc }) => (
            <div key={titulo} className="group bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border-2 border-transparent hover:border-[#ffc600] transition-all hover:shadow-xl">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#ffc600]/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#ffc600]/20 transition-colors">
                <Icon size={24} className="text-[#ffc600]" />
              </div>
              <h4 className="font-black text-[#1e293b] text-sm md:text-base uppercase italic tracking-tight mb-2">
                {titulo}
              </h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Google Reviews */}
        <div className="bg-[#1e293b] rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-center space-y-6">
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={22} className="text-[#ffc600] fill-[#ffc600]" />
            ))}
          </div>
          <h4 className="text-white font-black text-2xl md:text-4xl italic uppercase tracking-tighter">
            ¿Ya trabajaste con nosotros?
          </h4>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            Tu opinión nos ayuda a seguir creciendo y a que otros clientes nos conozcan. Tómate 2 minutos y déjanos tu reseña.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://g.page/r/CRa4ejtbBBcyEAI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#ffc600] text-[#1e293b] font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl md:rounded-2xl hover:bg-white transition-all shadow-xl"
            >
              <Star size={14} className="fill-[#1e293b]" />
              Dejar reseña en Google
            </a>
            <a
              href="https://wa.me/56989203902?text=Hola%20InnVolt%2C%20quiero%20dejarte%20un%20testimonio%20de%20mi%20experiencia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl md:rounded-2xl hover:bg-white/20 transition-all border border-white/10"
            >
              <MessageCircle size={14} />
              Enviarnos por WhatsApp
            </a>
          </div>
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            Somos nuevos y construimos nuestra reputación con cada proyecto ✦
          </p>
        </div>

      </div>
    </section>
  );
}
