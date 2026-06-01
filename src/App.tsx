import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES, INGREDIENTS } from './data';
import SlideRenderer from './components/SlideRenderer';
import PresenterNotes from './components/PresenterNotes';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  BookOpen, Leaf, Printer, Clock, HelpCircle, Sparkles, Volume2 
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [notesOpen, setNotesOpen] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [autoplayInterval, setAutoplayInterval] = useState<number>(5); // seconds
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);
  const [autoplayProgress, setAutoplayProgress] = useState<number>(0);

  const activeSlide = SLIDES[currentSlideIndex];
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Core navigation handlers
  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
    setAutoplayProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
    setAutoplayProgress(0);
  }, []);

  // Keyboard support: Left, Right, Area interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPrintMode) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen, isPrintMode]);

  // Autoplay and Progress Timing controllers
  useEffect(() => {
    if (isAutoplay && !isPrintMode) {
      // Trigger slide change every autoplayInterval seconds
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoplayInterval * 1000);

      // Increment progress gauge smoothly
      const steps = autoplayInterval * 10; // 10 ticks per second
      const increment = 100 / steps;
      progressTimerRef.current = setInterval(() => {
        setAutoplayProgress(p => {
          if (p >= 100) return 0;
          return p + increment;
        });
      }, 100);
    } else {
      setAutoplayProgress(0);
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isAutoplay, autoplayInterval, handleNext, isPrintMode]);

  const handleThumbnailClick = (index: number) => {
    setCurrentSlideIndex(index);
    setAutoplayProgress(0);
  };

  const handlePrintTrigger = () => {
    setIsPrintMode(true);
    // Give state a fraction of a second to render all items, then call browser print dialog
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Printable screen format mapping all slides
  if (isPrintMode) {
    return (
      <div className="bg-white min-h-screen p-8 text-slate-800 space-y-16 relative" id="print-view-document">
        
        {/* Floating print guidance banner */}
        <div className="no-print fixed top-4 right-4 bg-slate-900 text-white py-3 px-5 rounded-xl border border-slate-700 shadow-xl flex items-center gap-4 z-50">
          <div className="space-y-0.5">
            <span className="font-bold text-xs text-white block">Modo Imprimir de AeroDerm</span>
            <span className="text-[10px] text-slate-400 block">Pulse Cancelar o Imprimir. Luego cierre este modo para regresar.</span>
          </div>
          <button 
            onClick={() => setIsPrintMode(false)}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all"
            id="btn-exit-print-preview"
          >
            Volver a Diapositivas
          </button>
        </div>

        {/* Printable List block */}
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="border-b border-slate-200 pb-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Dossier de Presentación — Proyecto AeroDerm</h2>
            <p className="text-sm text-slate-500 font-medium">Contenido oficial estructurado y biotecnológico del aerosol térmico</p>
          </div>

          {SLIDES.map((slide) => (
            <div key={slide.id} className="print-page-break border-b border-slate-100 pb-12 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Diapositiva {slide.id}</span>
                <span className="text-xs text-slate-400 font-medium">AeroDerm Presentation</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 min-h-[300px]">
                <SlideRenderer slide={slide} />
              </div>

              {/* Presenter Notes appended below each printed slide in clean block */}
              <div className="bg-teal-50/40 p-4 rounded-xl border border-teal-100/60 mt-4">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Notas del Orador y Pautas de Exposición:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 font-semibold list-decimal pl-4">
                  {slide.speakerNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans transition-all duration-300 ${
      isFullscreen ? 'p-0.5 bg-slate-950 flex flex-col justify-between' : 'py-5 px-4 md:py-8 md:px-12'
    }`} id="presentation-app-root">

      {/* Top Header Controls (Hidden in immersive modes) */}
      {!isFullscreen && (
        <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-8 no-print" id="app-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center text-white font-extrabold font-display text-lg shadow-sm">
              A
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 uppercase font-display leading-none">
                Aeroderm<span className="text-teal-600 underline underline-offset-4 decoration-2">Tech</span>
                <span className="font-bold text-[10px] bg-teal-50 text-teal-700 py-0.5 px-2 rounded-full border border-teal-200 normal-case tracking-widest leading-none">ECO</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1 leading-none">Visor Oficial de Exposición Técnico-Médica</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto Play Setup Controls */}
            <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2.5">
              <button 
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`p-1.5 rounded-lg transition-all ${
                  isAutoplay ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-400 hover:text-slate-600'
                }`}
                title={isAutoplay ? "Pausar Autoplay" : "Iniciar Autoplay"}
                id="btn-play-autoplay"
              >
                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <div className="flex items-center gap-1 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-600">Intervalo:</span>
                <select 
                  value={autoplayInterval}
                  onChange={(e) => setAutoplayInterval(Number(e.target.value))}
                  disabled={isAutoplay}
                  className="bg-transparent border-0 font-bold text-slate-700 focus:outline-hidden disabled:opacity-50 text-xs cursor-pointer"
                  id="select-autoplay-interval"
                >
                  <option value={3}>3s</option>
                  <option value={5}>5s</option>
                  <option value={10}>10s</option>
                  <option value={15}>15s</option>
                </select>
              </div>
            </div>

            {/* Print Friendly Trigger */}
            <button
              onClick={handlePrintTrigger}
              className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 p-2.5 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Descargar Dossier / Guardar PDF"
              id="btn-app-print"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">Exportar PDF</span>
            </button>

            {/* Notes Panel Toggle */}
            <button
              onClick={() => setNotesOpen(!notesOpen)}
              className={`p-2.5 rounded-xl shadow-2xs transition-all border font-bold text-xs flex items-center gap-1.5 cursor-pointer ${
                notesOpen 
                  ? 'bg-teal-50 text-teal-800 border-teal-200' 
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
              title="Alternar notas de orador"
              id="btn-toggle-notes"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span className="hidden md:inline">Notas</span>
            </button>

            {/* Immersive presentation mode toggle */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold p-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Iniciar Modo Discurso"
              id="btn-active-fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-teal-400" />
              <span className="hidden lg:inline">Modo Exposición</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Slideshow Frame Display */}
      <main className={`max-w-7xl mx-auto grid grid-cols-1 ${
        notesOpen ? 'lg:grid-cols-4' : 'grid-cols-1'
      } gap-6 items-stretch flex-1 ${isFullscreen ? 'h-[85vh] md:h-[90vh] p-4 lg:p-8 bg-slate-950 text-white rounded-none border-0' : ''}`} id="slideshow-grid">
        
        {/* Active Slide Frame */}
        <div className={`${
          notesOpen ? 'lg:col-span-3' : 'col-span-1'
        } bg-white rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xs ${
          isFullscreen ? 'bg-slate-900/90 border-slate-800 text-white shadow-teal-950/20 shadow-xl' : 'border-slate-200/80 p-6 md:p-8 min-h-[460px] md:min-h-[520px]'
        }`} id="active-slide-frame">

          {/* Immersive slide controls if on fullscreen */}
          {isFullscreen && (
            <div className="absolute top-4 inset-x-4 flex justify-between items-center z-40 bg-slate-950 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase text-teal-400 tracking-widest flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                MODO EXPOSICIÓN — {activeSlide.title}
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-slate-400 font-bold">Slide {currentSlideIndex + 1} de {SLIDES.length}</span>
                
                {/* Notes Toggle inside Fullscreen */}
                <button
                  onClick={() => setNotesOpen(!notesOpen)}
                  className={`py-1 px-3.5 rounded-lg border text-[10px] font-bold transition-all ${
                    notesOpen ? 'bg-teal-500/20 text-teal-400 border-teal-500/50' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                  id="btn-toggle-notes-fs"
                >
                  Notas
                </button>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="bg-rose-950 border border-rose-800 text-rose-400 font-extrabold py-1 px-3.5 rounded-lg text-[10px]"
                  title="Salir de pantalla completa"
                  id="btn-exit-fullscreen"
                >
                  <Minimize2 className="w-3 h-3 inline mr-1" />
                  Salir
                </button>
              </div>
            </div>
          )}

          {/* Autoplay Progress line gauge */}
          {isAutoplay && (
            <div className="absolute top-0 left-0 w-full h-[3.5px] bg-slate-100/10 pointer-events-none z-50">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${autoplayProgress}%` }}
              />
            </div>
          )}

          {/* Slide Layout Renderer */}
          <div className={`flex-1 flex items-center justify-center p-3 md:p-6 ${isFullscreen ? 'pt-20' : ''}`} id="slide-layout-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 0.98, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full"
              >
                <SlideRenderer slide={activeSlide} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Navigation Controls (Previous & Next Arrow Buttons on Slide container side edge) */}
          <div className="absolute inset-y-1/2 left-2 right-2 pointer-events-none flex justify-between z-40">
            <button
              onClick={handlePrev}
              className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/65 text-white rounded-full pointer-events-auto transition-all shadow-md active:scale-95 cursor-pointer"
              title="Diapositiva Anterior"
              id="btn-side-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/65 text-white rounded-full pointer-events-auto transition-all shadow-md active:scale-95 cursor-pointer"
              title="Siguiente Diapositiva"
              id="btn-side-next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Progress Meter */}
          <div className={`mt-auto border-t py-3.5 px-6 flex justify-between items-center text-xs text-slate-400 font-bold select-none ${
            isFullscreen ? 'border-slate-800 bg-slate-950/40 text-slate-400' : 'border-slate-100 bg-slate-50/50'
          }`} id="slide-progress-footer">
            <span className="font-display tracking-wider uppercase text-[10px] text-slate-400">Proyecto AeroDerm — Barrera Térmica Ecológica</span>
            <div className="flex items-center gap-1.5">
              <span>{currentSlideIndex + 1} de {SLIDES.length}</span>
              <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden shrink-0">
                <div 
                  className="h-full bg-teal-600 rounded-full transition-all" 
                  style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Speaker notes right sidebar */}
        {notesOpen && (
          <div className="col-span-1 h-full" id="speaker-notes-sidebar-col">
            <PresenterNotes 
              slide={activeSlide}
              isOpen={notesOpen}
              onClose={() => setNotesOpen(false)}
            />
          </div>
        )}

      </main>

      {/* Thumbnails Navigation Strip Slider (Hidden in fullscreens if needed, let's keep it clean on desktop) */}
      <footer className="max-w-7xl mx-auto mt-6 space-y-4 no-print overflow-hidden" id="app-footer-nav">
        
        {/* Slide Titles & Index Navigation labels */}
        <div className="flex justify-between items-center px-2">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Índice de Diapositivas
          </span>
          <span className="text-xs text-slate-500 font-bold">Use las flechas del teclado <strong>izquierda/derecha</strong> para navegar</span>
        </div>

        {/* Thumbnail Cards Row */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 overflow-x-auto pb-2" id="thumbnail-cards-row">
          {SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => handleThumbnailClick(idx)}
                className={`py-3 px-2 text-center rounded-xl border text-[11px] font-bold leading-tight transition-all cursor-pointer relative ${
                  isSelected 
                    ? 'bg-teal-600 text-white border-teal-500 shadow-md transform -translate-y-0.5 font-display' 
                    : 'bg-white hover:bg-slate-50/70 text-slate-500 border-slate-200/80 shadow-2xs'
                }`}
                id={`btn-thumbnail-slide-${slide.id}`}
              >
                {/* Numeric index overlay */}
                <span className={`block text-[8px] font-semibold tracking-wider font-display uppercase mb-1 ${
                  isSelected ? 'text-teal-100' : 'text-slate-400'
                }`}>
                  Fase {slide.id}
                </span>
                
                {/* Visual title */}
                <span className="block truncate tracking-tight">{slide.title}</span>

                {/* Micro highlight indicator */}
                {isSelected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white block" />
                )}
              </button>
            );
          })}
        </div>

      </footer>

    </div>
  );
}
