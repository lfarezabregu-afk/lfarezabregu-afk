import React, { useState } from 'react';
import { GANTT_TASKS, MONTH_NAMES } from '../data';
import { GanttTask } from '../types';
import { Calendar, CheckCircle2, ChevronRight, Clock, Milestone } from 'lucide-react';
import { motion } from 'motion/react';

export default function InteractiveGantt() {
  const [activeTaskId, setActiveTaskId] = useState<number | null>(1);
  const activeTask = GANTT_TASKS.find(t => t.id === activeTaskId) || GANTT_TASKS[0];

  const getMonthPosition = (start: number, end: number) => {
    // start and end are 1-based (Ene = 1, Dic = 12)
    const left = ((start - 1) / 12) * 100;
    const width = ((end - start + 1) / 12) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm" id="active-gantt-root">
      {/* Left 2 parts: Grid Gantt representation */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 font-display">Cronograma de Desarrollo AeroDerm</h3>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-full">
            Planificación de 12 Meses
          </span>
        </div>

        {/* Calendar Grid Header */}
        <div className="relative">
          <div className="grid grid-cols-12 gap-1 border-b border-slate-200 pb-2 text-center text-xs font-bold text-slate-500">
            {MONTH_NAMES.map((m, idx) => (
              <div 
                key={m} 
                className={`py-1 transition-all duration-200 ${
                  activeTask && idx + 1 >= activeTask.startMonth && idx + 1 <= activeTask.endMonth 
                    ? 'text-teal-700 bg-teal-50 rounded-md font-bold scale-105 font-display' 
                    : ''
                }`}
              >
                {m}
              </div>
            ))}
          </div>

          {/* Task bars container */}
          <div className="mt-4 space-y-3.5 relative">
            {/* Background vertical dividing lines */}
            <div className="absolute inset-0 grid grid-cols-12 gap-1 pointer-events-none h-full z-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-dashed border-slate-200 h-full last:border-r-0" />
              ))}
            </div>

            {GANTT_TASKS.map((task) => {
              const pos = getMonthPosition(task.startMonth, task.endMonth);
              const isSelected = activeTaskId === task.id;

              return (
                <div 
                  key={task.id} 
                  className={`relative flex items-center h-10 transition-all duration-300 z-10 rounded-lg cursor-pointer ${
                    isSelected ? 'bg-slate-100/80' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setActiveTaskId(task.id)}
                  id={`gantt-task-row-${task.id}`}
                >
                  {/* Task label */}
                  <div className="w-1/3 pr-4 text-xs font-semibold text-slate-700 truncate pl-2 flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-teal-600 scale-125' : 'bg-slate-300'} transition-transform`} />
                    {task.activity}
                  </div>

                  {/* Task bar wrapper */}
                  <div className="w-2/3 relative h-full flex items-center pr-2">
                    {/* Visual Bar */}
                    <div 
                      className={`absolute h-7 rounded-md flex items-center px-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'bg-teal-600 text-white font-bold ring-2 ring-teal-500 ring-offset-1 scale-[1.01] font-display' 
                          : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/40 hover:scale-[1.01]'
                      }`}
                      style={{ left: pos.left, width: pos.width }}
                    >
                      <span className="text-[10px] truncate max-w-full pl-1">
                        {MONTH_NAMES[task.startMonth - 1]}-{MONTH_NAMES[task.endMonth - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subtle tip */}
        <p className="text-[11px] text-slate-400 italic">
          * Haz clic en cualquier etapa para ver los hitos clave, entregables y meses activos a la derecha.
        </p>
      </div>

      {/* Right 1 part: Focused Task details card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-xs flex flex-col justify-between" id="gantt-detail-card">
        {activeTask ? (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                Etapa {activeTask.id}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 font-display">{activeTask.activity}</h4>
            </div>

            {/* Months and Duration */}
            <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-slate-100 py-3">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  <strong>Período:</strong><br />
                  {MONTH_NAMES[activeTask.startMonth - 1]} - {MONTH_NAMES[activeTask.endMonth - 1]}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  <strong>Duración:</strong><br />
                  {activeTask.endMonth - activeTask.startMonth + 1} Meses
                </span>
              </div>
            </div>

            {/* Milestones / Hitos */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Milestone className="w-3.5 h-3.5 text-teal-500" />
                <span>Hitos clave y entregables:</span>
              </div>
              <div className="space-y-2">
                {activeTask.milestones.map((milestone, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    key={index} 
                    className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg text-xs font-semibold text-slate-600 border border-slate-100"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                    <span>{milestone}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
            Selecciona una actividad para ver los detalles.
          </div>
        )}

        {/* Progress summary block */}
        <div className="bg-teal-950 text-teal-205 p-3.5 rounded-lg text-[11px] mt-4 flex items-center justify-between border border-teal-900 shadow-sm font-display">
          <div className="space-y-0.5">
            <span className="font-bold text-white block">AeroDerm Ready</span>
            <span className="text-slate-350">Seguimiento de hoja de ruta</span>
          </div>
          <ChevronRight className="w-4 h-4 text-teal-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
