import React, { useState, useEffect, useRef } from 'react';
import { Flame, ShieldAlert, Sparkles, Thermometer, User, RefreshCw, Layers, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InteractiveSimulator() {
  const [hasAeroDerm, setHasAeroDerm] = useState<boolean>(true);
  const [heatSource, setHeatSource] = useState<'flame' | 'water' | 'oven'>('flame');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [skinTemp, setSkinTemp] = useState<number>(36.5);
  const [hydrogelWater, setHydrogelWater] = useState<number>(100); // % water remaining
  const [severity, setSeverity] = useState<'safe' | 'warning' | 'danger'>('safe');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getHeatDetails = () => {
    switch (heatSource) {
      case 'flame':
        return { name: 'Flama Directa (Mechero)', temp: 150, description: 'Simula el fuego de un soplete de laboratorio' };
      case 'water':
        return { name: 'Agua Hirviendo', temp: 100, description: 'Contacto con salpicaduras o vapores industriales' };
      case 'oven':
        return { name: 'Horno Industrial', temp: 120, description: 'Proximidad a un horno de fundición o panadería' };
    }
  };

  const details = getHeatDetails();

  useEffect(() => {
    if (isSimulating) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
        
        setSkinTemp(current => {
          if (!hasAeroDerm) {
            // No protection: heating is extremely fast!
            let rise = 3.5;
            if (heatSource === 'flame') rise = 5.2;
            if (heatSource === 'oven') rise = 4.0;
            const next = current + rise;
            if (next >= details.temp) return details.temp;
            return parseFloat(next.toFixed(1));
          } else {
            // Protected: hydrogel absorbs heat, water content drops
            setHydrogelWater(w => {
              const decline = heatSource === 'flame' ? 4 : heatSource === 'oven' ? 3 : 2.5;
              const nextW = Math.max(0, w - decline);
              return nextW;
            });

            // Temperature rises slowly
            let rise = 0.2;
            if (hydrogelWater <= 50) rise = 0.5; // less water, slightly more heating
            if (hydrogelWater <= 10) rise = 2.0; // dry gel, loses insulating properties
            const next = current + rise;
            if (next >= details.temp) return details.temp;
            return parseFloat(next.toFixed(1));
          }
        });
      }, 300);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSimulating, hasAeroDerm, heatSource, hydrogelWater]);

  // Update warnings / severity based on temperature
  useEffect(() => {
    if (skinTemp <= 40) {
      setSeverity('safe');
    } else if (skinTemp <= 52) {
      setSeverity('warning');
    } else {
      setSeverity('danger');
    }
  }, [skinTemp]);

  const toggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
    } else {
      setIsSimulating(true);
    }
  };

  const resetSimulator = () => {
    setIsSimulating(false);
    setElapsedSeconds(0);
    setSkinTemp(36.5);
    setHydrogelWater(100);
    setSeverity('safe');
  };

  const currentStatusMessage = () => {
    if (!isSimulating && elapsedSeconds === 0) {
      return hasAeroDerm 
        ? "Formulación aplicada: AeroDerm forma una barrera biodegradable húmeda de alginato." 
        : "Sin protección. La piel está vulnerable al contacto térmico.";
    }

    if (!hasAeroDerm) {
      if (skinTemp >= 60) return "¡ALERTA DE QUEMADURAS SEVERAS! Daño tisular inmediato irreversible.";
      if (skinTemp >= 45) return "Umbral de dolor superado. Quemaduras leves en proceso.";
      return "Calentamiento rápido sin disipador.";
    } else {
      if (hydrogelWater <= 0) return "El agua de la matriz se ha evaporado. La barrera empieza a debilitarse.";
      if (hydrogelWater <= 40) return "Disipación activa. El alginato retiene la humedad restante y el quitosano se adhiere.";
      return "Protección óptima. El agua contenida en el hidrogel absorbe el calor por completo.";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xl" id="simulator-container">
      
      {/* Simulation Setup Area */}
      <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-white">Configuración del Test</h3>
          </div>

          {/* Protector Mode Selection */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-semibold text-slate-400 block">Selección de Protección</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { resetSimulator(); setHasAeroDerm(true); }}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 border ${
                  hasAeroDerm 
                    ? 'bg-teal-600/20 text-teal-400 border-teal-500 shadow-sm shadow-teal-500/20 font-display' 
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                }`}
                id="btn-select-aeroderm"
              >
                <Layers className="w-3.5 h-3.5" />
                Con AeroDerm
              </button>
              <button
                onClick={() => { resetSimulator(); setHasAeroDerm(false); }}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 border ${
                  !hasAeroDerm 
                    ? 'bg-rose-600/20 text-rose-400 border-rose-500 shadow-sm shadow-rose-500/20' 
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                }`}
                id="btn-select-unshielded"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Sin AeroDerm
              </button>
            </div>
          </div>

          {/* Heat Sources Selector */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-semibold text-slate-400 block">Fuente de Calor Extremo</span>
            <div className="space-y-2">
              {(['flame', 'water', 'oven'] as const).map(source => (
                <button
                  key={source}
                  disabled={isSimulating}
                  onClick={() => { resetSimulator(); setHeatSource(source); }}
                  className={`w-full text-left py-2 px-3 text-xs rounded-lg transition-all flex items-center justify-between border ${
                    heatSource === source 
                      ? 'bg-sky-600/10 text-sky-400 border-sky-500/50' 
                      : 'bg-slate-950/50 text-slate-400 border-slate-900 hover:bg-slate-900 hover:text-slate-300 disabled:opacity-55'
                  }`}
                  id={`btn-source-${source}`}
                >
                  <div className="flex items-center gap-2">
                    <Flame className={`w-3.5 h-3.5 ${heatSource === source ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="font-medium">
                      {source === 'flame' ? 'Fuego Directo (90°C+)' : source === 'water' ? 'Agua Hirviendo (100°C)' : 'Calor de Horno (120°C)'}
                    </span>
                  </div>
                  {heatSource === source && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">Activo</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={toggleSimulation}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isSimulating 
                ? 'bg-amber-600 border border-amber-500 text-white shadow-sm hover:bg-amber-500' 
                : 'bg-teal-500 border border-teal-400 text-slate-950 shadow-sm hover:bg-teal-400'
            }`}
            id="btn-play-pause-sim"
          >
            {isSimulating ? 'Pausar Test' : 'Iniciar Exposición'}
          </button>
          
          <button
            onClick={resetSimulator}
            className="w-full py-2.5 px-4 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            id="btn-reset-sim"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Graphical Screen Area */}
      <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800/80 p-5 flex flex-col justify-between space-y-6" id="simulation-screen">
        
        {/* Screen Header Metrics */}
        <div className="grid grid-cols-3 gap-3 border-b border-slate-800/80 pb-4">
          <div className="text-center bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Tiempo de Exposición</span>
            <span className="text-lg font-bold text-sky-400 mt-1 block">{(elapsedSeconds * 1.5).toFixed(1)}s <span className="text-xs text-slate-500">simulados</span></span>
          </div>
          
          <div className="text-center bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-display">Matriz de Agua</span>
            <span className="text-lg font-bold text-teal-400 mt-1 block">
              {hasAeroDerm ? `${hydrogelWater}%` : '0% (Falto)'}
            </span>
          </div>

          <div className="text-center bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-display">Criterio de Seguridad</span>
            <span className={`text-xs font-bold leading-none py-1.5 px-2.5 rounded-md inline-block mt-1 ${
              severity === 'safe' 
                ? 'bg-teal-500/10 text-teal-400' 
                : severity === 'warning' 
                  ? 'bg-amber-500/10 text-amber-400' 
                  : 'bg-rose-500/15 text-rose-400 animate-pulse'
            }`}>
              {severity === 'safe' ? 'Piel Protegida' : severity === 'warning' ? 'Dolor / Alerta' : '¡Quemadura Activa!'}
            </span>
          </div>
        </div>

        {/* Visual Simulated Hand and Fire Elements */}
        <div className="relative h-44 bg-slate-950/70 border border-slate-800/50 rounded-xl flex items-center justify-center overflow-hidden">
          
          {/* Flame element */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute left-1/4 flex flex-col items-center z-10"
              >
                <Flame className={`w-16 h-16 text-orange-500 animate-bounce relative`} style={{ filter: 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.4))' }} />
                <span className="text-[10px] bg-red-950 border border-red-800 text-red-400 font-extrabold px-1.5 py-0.5 rounded-md mt-1 shadow-sm">
                  {details.temp}°C
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connecting arrow/radiation lines */}
          {isSimulating && (
            <div className="absolute left-[38%] top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping delay-75" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping delay-150" />
            </div>
          )}

          {/* Under-test Surface (The Hand / Skin mockup) */}
          <div className="absolute right-12 md:right-1/5 flex flex-col items-center">
            <div className="relative">
              {/* Actual physical hand mockup container */}
              <div 
                className={`w-32 h-16 rounded-2xl border flex flex-col items-center justify-center p-3 transition-colors duration-300 relative z-20 ${
                  severity === 'safe' 
                    ? 'bg-teal-950/25 border-teal-800/60 shadow-sm shadow-teal-500/5' 
                    : severity === 'warning'
                      ? 'bg-amber-950/30 border-amber-800/60'
                      : 'bg-red-950/40 border-red-800/60'
                }`}
              >
                <User className={`w-6 h-6 ${
                  severity === 'safe' ? 'text-teal-400' : severity === 'warning' ? 'text-amber-400' : 'text-rose-400'
                }`} />
                <span className="text-xs font-semibold text-slate-300 mt-1">Tejido Dérmico</span>

          {/* Simulated Hydrogel Layer Visual Shield */}
                {hasAeroDerm && (
                  <div 
                    className="absolute inset-x-[-8px] inset-y-[-8px] rounded-3xl border border-dashed border-teal-400/80 bg-teal-400/10 pointer-events-none z-10 flex items-center justify-end pr-2"
                    style={{ opacity: hydrogelWater / 100 }}
                  >
                    <span className="text-[8px] bg-sky-950 border border-sky-800 text-sky-300 font-extrabold px-1 rounded-sm scale-75 transform translate-y-3 font-mono">
                      AeroDerm
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thermometer Display Overlay */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-slate-900/90 py-1.5 px-2.5 rounded-lg border border-slate-800 z-30">
            <Thermometer className={`w-4 h-4 ${
              severity === 'safe' ? 'text-teal-400' : severity === 'warning' ? 'text-amber-400' : 'text-red-500 animate-pulse'
            }`} />
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold leading-none font-display">Piel</span>
              <span className={`text-sm font-extrabold ${
                severity === 'safe' ? 'text-teal-400' : severity === 'warning' ? 'text-amber-400' : 'text-rose-500'
              }`}>{skinTemp}°C</span>
            </div>
          </div>
        </div>

        {/* Real-time description logs box */}
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
          severity === 'safe' 
            ? 'bg-teal-950/20 border-teal-900/60 text-teal-350' 
            : severity === 'warning'
              ? 'bg-amber-950/20 border-amber-900/60 text-amber-300'
              : 'bg-rose-950/20 border-rose-900/60 text-rose-300 animate-pulse'
        }`}>
          <div className="flex gap-2 items-center font-bold mb-1">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Monitoreo Sensorial:</span>
          </div>
          <p>{currentStatusMessage()}</p>
        </div>

      </div>

    </div>
  );
}
