import React, { useState } from 'react';
import { Printer, Download, BookOpen, User, Calendar, CheckCircle2 } from 'lucide-react';
import { experiments } from '../../data/experimentsData';
import { codeTemplates } from '../../data/codeTemplates';

export const LabRecordExport: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<number>(1);
  const [studentName, setStudentName] = useState<string>('Student Name');
  const [hallTicket, setHallTicket] = useState<string>('21N31A66XX');
  const [branch, setBranch] = useState<string>('CSE (AI & ML)');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const exp = experiments.find((e: any) => e.id === selectedExpId) || experiments[0];
  const template = (codeTemplates as any)[selectedExpId] || { raw_code: '# Code loading...' };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Configuration Controls (Hidden during print) */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 print:hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400">
                LAB MANUAL RECORD GENERATOR
              </span>
              <span className="text-xs font-mono text-slate-400">Standard MRCET Autonomous Sheet</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">Lab Observation & Record Sheet Export</h2>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Select Experiment:</label>
            <select
              value={selectedExpId}
              onChange={(e) => setSelectedExpId(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-400 font-mono"
            >
              {experiments.map((e: any) => (
                <option key={e.id} value={e.id}>
                  Week {e.id}: {e.title.slice(0, 30)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Student Full Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Hall Ticket Number:</label>
            <input
              type="text"
              value={hallTicket}
              onChange={(e) => setHallTicket(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Execution Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Printable Sheet (Standard White paper layout in print media) */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300 font-serif print:p-0 print:border-none print:shadow-none print:rounded-none">
        {/* Institute Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
            Malla Reddy College of Engineering & Technology
          </h2>
          <p className="text-xs text-slate-700 italic">
            (Autonomous Institution – UGC, Govt. of India | Affiliated to JNTUH, Hyderabad)
          </p>
          <p className="text-xs font-semibold text-slate-800 mt-1">
            Department of Computer Science & Engineering (AI & ML)
          </p>
          <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider mt-2 bg-slate-100 py-1 border border-slate-300">
            Deep Learning Laboratory (R20A6683) • Observation Record
          </h3>
        </div>

        {/* Student Meta Details Grid */}
        <div className="grid grid-cols-2 text-xs border border-slate-400 p-3 mb-6 bg-slate-50 font-sans">
          <div className="space-y-1">
            <p>
              <strong className="text-slate-700">Student Name:</strong> {studentName}
            </p>
            <p>
              <strong className="text-slate-700">Roll / HT No:</strong>{' '}
              <span className="font-mono">{hallTicket}</span>
            </p>
            <p>
              <strong className="text-slate-700">Department / Branch:</strong> {branch}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p>
              <strong className="text-slate-700">Academic Year:</strong> 2026–2027
            </p>
            <p>
              <strong className="text-slate-700">Year & Semester:</strong> IV B.Tech – I Semester
            </p>
            <p>
              <strong className="text-slate-700">Date of Experiment:</strong> {date}
            </p>
          </div>
        </div>

        {/* Experiment Content */}
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Experiment Number and Title */}
          <div className="border-b border-slate-300 pb-2">
            <span className="text-xs font-bold font-mono text-cyan-800 block">
              EXPERIMENT NO: {exp.id} (WEEK {exp.id})
            </span>
            <h4 className="text-base font-bold text-slate-900">{exp.title}</h4>
          </div>

          {/* Aim */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">1. Aim:</h5>
            <p className="text-slate-800 pl-4">{exp.aim}</p>
          </div>

          {/* Objectives */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
              2. Objectives:
            </h5>
            <ul className="list-disc pl-8 space-y-1 text-slate-800">
              {exp.objectives.map((obj: string, i: number) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Concept */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
              3. Theory & Concept:
            </h5>
            <p className="text-slate-800 pl-4">{exp.concept}</p>
          </div>

          {/* Algorithm */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
              4. Algorithm:
            </h5>
            <ol className="list-decimal pl-8 space-y-1 text-slate-800">
              {exp.algorithm.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Source Code */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
              5. Prescribed Python Source Code:
            </h5>
            <div className="bg-slate-100 p-4 rounded border border-slate-300 font-mono text-[11px] leading-tight overflow-x-auto whitespace-pre">
              {template.raw_code}
            </div>
          </div>

          {/* Result / Conclusion */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
              6. Result & Inference:
            </h5>
            <p className="text-slate-800 pl-4">
              The {exp.title} was successfully implemented in Python using TensorFlow / Keras and evaluated according to MRCET guidelines. The model converged properly and metrics were recorded.
            </p>
          </div>

          {/* Evaluation & Signature Block */}
          <div className="pt-8 mt-12 border-t-2 border-slate-900 grid grid-cols-3 text-center text-xs font-sans">
            <div>
              <p className="text-slate-500 mb-8">Experiment Execution Marks</p>
              <p className="font-bold border-t border-slate-400 pt-1 mx-4">Max: 10 Marks</p>
            </div>
            <div>
              <p className="text-slate-500 mb-8">Record & Viva Marks</p>
              <p className="font-bold border-t border-slate-400 pt-1 mx-4">Max: 10 Marks</p>
            </div>
            <div>
              <p className="text-slate-500 mb-8">Evaluator Signature</p>
              <p className="font-bold border-t border-slate-400 pt-1 mx-4">Faculty In-Charge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
