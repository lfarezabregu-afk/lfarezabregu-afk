import React, { useState } from 'react';
import { Slide } from '../types';
import { IMAGES, INGREDIENTS, USE_CASES, MANUFACTURING_STEPS, TEST_DETAILS } from '../data';
import { 
  ShieldAlert, Factory, Flame, Sparkles, 
  Leaf, Info, Clock, CheckCircle2, FlaskConical, Beaker, HelpCircle 
} from 'lucide-react';
import InteractiveGantt from './InteractiveGantt';
import InteractiveSimulator from './InteractiveSimulator';
import { motion } from 'motion/react';

interface SlideRendererProps {
  slide: Slide;
}

export default function SlideRenderer({ slide }: SlideRendererProps) {
  const [activeIngredient, setActiveIngredient] = useState<number | null>(0);
  const [activeMfgStep, setActiveMfgStep] = useState<number>(1);

  // Helper to matching Lucide icons dynamically to avoid runtime lookup crashes
  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Factory': return <Factory className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <HelpCircle className={className} />;
    }
  };

  switch (slide.type) {
    case 'cover':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-w-6xl mx-auto" id="slide-cover-root">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-teal-200">
              <Leaf className="w-3.5 h-3.5 text-teal-600" />
              <span>Proyecto Biotecnológico Protegido</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none font-display">
              Aero<span className="text-teal-600 font-bold decoration-teal-600/30 underline underline-offset-8">Derm</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-slate-500 tracking-tight leading-relaxed max-w-2xl">
              {slide.subtitle}
            </p>

            <div className="border-l-4 border-teal-500 pl-4 py-1.5 bg-teal-50/50 rounded-r-lg max-w-xl">
              <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                Alternativa práctica, rápida y ecológica para la protección inmediata y biocompatible de la piel frente a quemaduras y altas temperaturas.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
              <span className="bg-slate-100 py-1.5 px-3 rounded-md">Alginato de Sodio de Algas</span>
              <span className="bg-slate-100 py-1.5 px-3 rounded-md">Quitosano fúngico regenerador</span>
              <span className="bg-slate-100 py-1.5 px-3 rounded-md">Tecnología Bag-on-Valve 0% HFC</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Decorative radial blur backdrops */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-400 to-sky-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition duration-1000"></div>
              <img 
                src={IMAGES.bottle} 
                alt="AeroDerm Aerosol Can" 
                className="relative rounded-2xl border border-slate-200 shadow-md max-h-[380px] w-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      );

    case 'intro':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full max-w-6xl mx-auto" id="slide-intro-root">
          <div className="space-y-5 text-left">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Origen y Visión</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2 font-display">La Necesidad de Protección Inmediata</h2>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              La idea surgió al pensar en los graves riesgos de quemaduras inmediatas que sufren las personas cerca de incendios o de calor extremo. Desarrollamos un escudo dérmico aplicable en segundos.
            </p>

            <div className="space-y-4 pt-1">
              {/* Problem vs Solution list */}
              <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-100 flex gap-3">
                <div className="bg-rose-100 text-rose-800 font-extrabold text-xs px-2.5 py-1 rounded-md h-fit">Problema</div>
                <div className="text-xs text-rose-900 font-medium">
                  <strong>Inexistencia de barreras provisionales rápidas:</strong> Falta de protección inmediata de fácil acceso, rápida colocación frente al calor, previniendo daños severos antes de equipamiento profesional pesado.
                </div>
              </div>

              <div className="bg-teal-50 p-3.5 rounded-xl border border-teal-100 flex gap-3">
                <div className="bg-teal-100 text-teal-800 font-extrabold text-xs px-2.5 py-1 rounded-md h-fit">Solución</div>
                <div className="text-xs text-slate-700 font-semibold">
                  <strong>AeroDerm Aerosol:</strong> Creación de una fina capa protectora biodegradable sobre la piel que disipa la transferencia calórica y evita ampollas o daños leves en situaciones de escape o aproximación.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-teal-600" />
              <span>Enfoque Ecológico y Biodegradable</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No solo protegemos la piel, también cuidamos el ambiente. Tanto el hidrogel como el envase utilizan materiales amigables:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 font-semibold text-xs text-slate-600">
                <span className="text-teal-700 font-bold block mb-1">Ingredientes Biocompatibles</span>
                Hecho puramente con alginato marino y quitosano extraído de hongos compostables.
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 font-semibold text-xs text-slate-600">
                <span className="text-teal-700 font-bold block mb-1">Envases de Mínima Huella</span>
                Materiales de aluminio reciclable, boquillas libres de microplásticos y propelentes orgánicos.
              </div>
            </div>

            <p className="text-xs text-teal-700 font-extrabold bg-teal-50/70 p-2.5 rounded-md border border-teal-100/60 italic text-center">
              "AeroDerm busca reducir la contaminación global al mismo tiempo que proveemos seguridad inmediata."
            </p>
          </div>
        </div>
      );

    case 'use-cases':
      return (
        <div className="space-y-6 max-w-6xl mx-auto text-left" id="slide-use-cases-root">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md inline-block">¿Para qué sirve?</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2 font-display">¿Quiénes y en qué situaciones ayuda?</h2>
            <p className="text-sm text-slate-450 mt-1 font-semibold">
              * Nota: No reemplaza equipamientos profesionales contra fuegos, sino que funciona como protección rápida y extra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
            {USE_CASES.map((uc, index) => (
              <div 
                key={uc.title} 
                className="bg-white hover:bg-slate-50/55 p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between transition-all hover:scale-[1.01] duration-200 group"
              >
                <div className="space-y-3.5">
                  <div className="bg-teal-50 text-teal-700 p-2.5 rounded-xl w-fit group-hover:bg-teal-100 transition-colors">
                    {renderIcon(uc.icon, "w-5 h-5")}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 tracking-tight border-b border-slate-100 pb-1.5 font-display">{uc.title}</h3>
                  <ul className="space-y-2">
                    {uc.items.map(item => (
                      <li key={item} className="text-xs text-slate-600 leading-relaxed font-semibold flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-wrap gap-y-2 justify-between items-center font-bold">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              Incendios forestales y urbanos
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              Labor de cocina y aceite caliente
            </span>
            <span className="flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-blue-500" />
              Accidentes de evacuación domiciliarios
            </span>
          </div>
        </div>
      );

    case 'how-works':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full max-w-6xl mx-auto" id="slide-how-works-root">
          <div className="space-y-5 text-left">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Mecanismo Físico</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2 font-display">¿Cómo funciona la capa AeroDerm?</h2>
            </div>

            <p className="text-sm text-slate-500 font-light text-base leading-relaxed">
              El aerosol forma instantáneamente una fina capa polimérica hidratada sobre el tejido de la piel que ralentiza significativamente el calentamiento.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/40">
                <div className="bg-teal-500 text-slate-950 font-extrabold px-2.5 py-1 text-xs rounded-lg h-fit flex items-center justify-center">1</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 font-display">Crea barrera y aislamiento térmico</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">No bloquea el calor por completo de manera espacial, pero frena drásticamente la transferencia al disipar la energía por evaporación húmeda.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/40">
                <div className="bg-teal-500 text-slate-950 font-extrabold px-2.5 py-1 text-xs rounded-lg h-fit flex items-center justify-center">2</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 font-display">Reduce la sensación térmica</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">Incluso aplicándose cerca a la radiación, mantiene la piel a rangos tolerables de temperatura previniendo la quemadura inmediata.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/40">
                <div className="bg-teal-500 text-slate-950 font-extrabold px-2.5 py-1 text-xs rounded-lg h-fit flex items-center justify-center">3</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 font-display">Retrasa el calentamiento superficial</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">Otorga minutos invaluables en escapes de fuego o evacuaciones de recintos de emergencia.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5 text-left font-semibold">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-2 flex items-center gap-2 font-display">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Tiempo de Protección Estimada</span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              La protección del hidrogel no es estática, funciona estimadamente entre <strong>30 minutos y 2 horas</strong>, dependiendo directamente de varios factores dinámicos:
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Factor indicators */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>Intensidad de Temperatura</span>
                  <span className="font-bold text-teal-600 border border-teal-100 bg-teal-50/50 px-1.5 py-0.5 rounded-md">30 min (alta) - 2 hr (moderada)</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>Resistencia a Transpiración y roce físico</span>
                  <span className="font-bold text-teal-600 border border-teal-100 bg-teal-50/50 px-1.5 py-0.5 rounded-md">Similar a bloqueadores solares</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 italic mt-4 shadow-3xs">
              "El alginato marino almacena moléculas de agua de manera estable. Al aplicar calor extremo, el agua se evapora lentamente absorbiendo los julios de energía antes de que toquen la matriz de la epidermis."
            </div>
          </div>
        </div>
      );

    case 'materials':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-w-6xl mx-auto" id="slide-materials-root">
          
          <div className="lg:col-span-12 xl:col-span-4 space-y-4 text-left">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Biotecnología</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2 font-display">Materiales y Composición Química</h2>
            </div>
            
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              En lugar de polímeros sintéticos, formulamos basándonos en hidrogeles naturales inspirados en la <strong className="text-teal-700">biomimética</strong>.
            </p>

            {/* Grid of buttons to inspect elements */}
            <div className="space-y-2 pt-2">
              {INGREDIENTS.map((ing, idx) => (
                <button
                  key={ing.name}
                  onClick={() => setActiveIngredient(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between font-bold cursor-pointer ${
                    activeIngredient === idx 
                      ? 'bg-teal-600 text-white border-teal-500 shadow-md transform translate-x-1 font-display' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100/50'
                  }`}
                  id={`btn-inspect-ingredient-${idx}`}
                >
                  <span className="text-xs font-bold">{ing.name}</span>
                  <span className="text-[10px] opacity-80 uppercase tracking-widest">{ing.source}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-5 text-left bg-slate-50 p-6 rounded-2xl border border-slate-200 h-full flex flex-col justify-between" id="materials-focused-card">
            {activeIngredient !== null ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                    Sustancia Activa
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-1.5">{INGREDIENTS[activeIngredient].name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 font-semibold">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Fuente</span>
                    <strong className="text-slate-800 mt-0.5 block font-display">{INGREDIENTS[activeIngredient].source}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 font-semibold">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Eco-Sostenible</span>
                    <strong className="text-teal-700 mt-0.5 block font-display">{INGREDIENTS[activeIngredient].ecoFeature}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-semibold">
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">Descripción Detallada</span>
                  <p className="text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60">
                    {INGREDIENTS[activeIngredient].description}
                  </p>
                </div>

                <div className="bg-teal-950 p-3.5 rounded-xl border border-teal-900 text-xs shadow-xs">
                  <span className="text-teal-300 block font-bold text-[10px] uppercase font-display">Rol principal en AeroDerm:</span>
                  <p className="text-white font-bold text-xs mt-0.5 leading-relaxed">{INGREDIENTS[activeIngredient].role}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic text-center my-auto">Selecciona una sustancia a la izquierda para ver su composición biológica.</p>
            )}
          </div>

          <div className="lg:col-span-5 xl:col-span-3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-sky-500 rounded-2xl blur-lg opacity-25"></div>
              <img 
                src={IMAGES.ingredients} 
                alt="AeroDerm Raw Ingredients" 
                className="relative rounded-2xl border border-slate-200 shadow-sm max-h-[300px] w-auto object-cover opacity-95 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      );

    case 'manufacturing':
      const currentStep = MANUFACTURING_STEPS.find(s => s.stepNumber === activeMfgStep) || MANUFACTURING_STEPS[0];
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-w-6xl mx-auto" id="slide-manufacturing-root">
          <div className="lg:col-span-12 xl:col-span-4 space-y-4 text-left">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Proceso Operativo</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2 font-display">Fabricación y Envasado Limpio</h2>
            </div>
            
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              El proceso se realiza bajo rigurosas condiciones de biorreactor para obtener suspensiones coloidales homogéneas de peso molecular específico.
            </p>

            {/* Stepper buttons */}
            <div className="space-y-2 mt-4">
              {MANUFACTURING_STEPS.map(step => (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveMfgStep(step.stepNumber)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left text-xs transition-all flex items-center gap-3 border font-bold cursor-pointer ${
                    activeMfgStep === step.stepNumber 
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md' 
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                  id={`btn-mfg-step-${step.stepNumber}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    activeMfgStep === step.stepNumber ? 'bg-teal-500 text-slate-950' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <span className="truncate font-display">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left h-full flex flex-col justify-between" id="mfg-step-focused-card">
            {currentStep ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Estación de Trabajo</span>
                    <strong className="text-xs text-slate-800 font-display block">{currentStep.equipment}</strong>
                  </div>
                  <span className="bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-md shrink-0 block border border-teal-100">
                    Fase {currentStep.stepNumber} de 4
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <h3 className="font-bold text-base text-slate-900 font-display">{currentStep.title}</h3>
                  <p className="text-slate-500 font-semibold leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/60">
                    {currentStep.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block font-display">Parámetros Críticos de Control:</span>
                  <div className="space-y-1.5">
                    {currentStep.details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-slate-250 shadow-2xs font-semibold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-5 xl:col-span-3 flex justify-center">
            <img 
              src={IMAGES.process} 
              alt="Lab Manufacturing Setup" 
              className="rounded-2xl border border-slate-200 shadow-sm max-h-[300px] w-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      );

    case 'testing':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-w-6xl mx-auto" id="slide-testing-root">
          <div className="lg:col-span-12 xl:col-span-4 space-y-4 text-left">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Regulación</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2 font-display">Pruebas, Ensayos y Resultados</h2>
            </div>
            
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              El desarrollo de AeroDerm integra rigurosos testeos de laboratorio para asegurar total inocuidad cutánea previo a evaluaciones de desempeño térmico.
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-850 space-y-2 font-bold text-xs shadow-sm shadow-teal-900/15">
              <span className="text-[10px] font-bold uppercase text-teal-400 block tracking-widest font-mono">Compromiso Sanitario</span>
              <span className="block italic text-slate-355 leading-relaxed font-light">"Normas de Biocompatibilidad ISO 10993: Ninguna toxicidad, sin enrojecimiento dérmico ni quemaduras químicas incidentales de ningún tipo."</span>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 max-h-[440px] overflow-y-auto text-left" id="slide-testing-grid">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-1.5 font-display">Inspecciones de Laboratorio y Pruebas Funcionales</h3>
            
            <div className="space-y-2.5">
              {TEST_DETAILS.map(test => (
                <div key={test.title} className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                        test.category === 'lab' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {test.category === 'lab' ? 'Laboratorio' : 'Evidencia Práctica'}
                      </span>
                      <strong className="text-xs text-slate-800 block font-display">{test.title}</strong>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">{test.description}</p>
                    <span className="text-[10px] text-slate-400 font-semibold block">Método: {test.method}</span>
                  </div>
                  <span className="bg-teal-50 text-teal-850 text-xs font-bold px-2.5 py-1 rounded-md shrink-0 block shadow-3xs border border-teal-100">
                    {test.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'gantt':
      return (
        <div className="h-full w-full" id="slide-gantt-root">
          <InteractiveGantt />
        </div>
      );

    case 'simulator':
      return (
        <div className="h-full w-full" id="slide-simulator-root">
          <InteractiveSimulator />
        </div>
      );

    default:
      return (
        <div className="h-full flex items-center justify-center text-slate-400 italic">
          Sin renderizador diseñado para esta diapositiva.
        </div>
      );
  }
}
