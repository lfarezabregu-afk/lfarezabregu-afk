import React from 'react';
import { Slide } from '../types';
import { Volume2, ChevronRight, Minimize2, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface PresenterNotesProps {
  slide: Slide;
  isOpen: boolean;
  onClose: () => void;
}

export default function PresenterNotes({ slide, isOpen, onClose }: PresenterNotesProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 h-full flex flex-col justify-between"
      id="presenter-notes-container"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3" id="presenter-notes-header">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-teal-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-display">Notas del Orador</h4>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-md transition-all text-slate-400 hover:text-slate-600"
            title="Ocultar notas"
            id="btn-close-notes"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Notes list */}
        <div className="space-y-3" id="presenter-notes-body">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Consejos para Diapositiva {slide.id}</span>
          <h5 className="font-bold text-xs text-slate-700">{slide.title}</h5>

          <div className="space-y-2.5 mt-2">
            {slide.speakerNotes.map((note, index) => (
              <div 
                key={index} 
                className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100/60"
              >
                <div className="bg-teal-50 border border-teal-200 text-teal-800 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Cue */}
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-2 text-[10px] text-slate-500 font-medium">
        <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Tip: Enfoque su voz en el impacto ecológico e inmediato de AeroDerm en lugar de tecnicismos complejos de la química fina del alginato.</span>
      </div>
    </motion.div>
  );
}
