import React, { useState, useMemo, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Printer, HelpCircle, FileText } from 'lucide-react';
import { Scores, Question, ChartData, MaturityLevel } from '../types';

const CommercialWheel: React.FC = () => {
  // Set the document title for the PDF filename
  useEffect(() => {
    document.title = "Diagnostico_Comercial_MEV_ASEC";
  }, []);

  // Initial state for the 10 questions
  const [scores, setScores] = useState<Scores>({
    q1: 5, q2: 5, q3: 5, q4: 5, q5: 5,
    q6: 5, q7: 5, q8: 5, q9: 5, q10: 5
  });

  const questions: Question[] = [
    { id: 'q1', label: 'Clareza do Funil', fullText: 'Quão claro está o seu funil de vendas hoje?' },
    { id: 'q2', label: 'Domínio do Processo', fullText: 'O quanto você domina cada etapa do seu processo comercial?' },
    { id: 'q3', label: 'Prospecção', fullText: 'Quão eficiente é seu processo de prospecção atual?' },
    { id: 'q4', label: 'Previsibilidade', fullText: 'O quanto você consegue gerar previsibilidade de resultados?' },
    { id: 'q5', label: 'Métricas/KPIs', fullText: 'O quanto você acompanha métricas e indicadores de vendas diariamente?' },
    { id: 'q6', label: 'Playbook/Script', fullText: 'Quão forte é o seu script de abordagem (ou playbook comercial)?' },
    { id: 'q7', label: 'Contorno de Objeções', fullText: 'O quanto você está preparado para lidar com objeções?' },
    { id: 'q8', label: 'Follow-up', fullText: 'O quanto seu follow-up é consistente e estratégico?' },
    { id: 'q9', label: 'Definição de ICP', fullText: 'Quão claro está o seu ICP (perfil ideal de cliente)?' },
    { id: 'q10', label: 'Experiência do Cliente', fullText: 'O quanto seu time entrega experiência de excelência?' },
  ];

  // Prepare data for Recharts
  const data: ChartData[] = useMemo(() => questions.map(q => ({
    subject: q.label,
    A: scores[q.id],
    fullMark: 10,
  })), [scores]);

  const handleScoreChange = (id: string, value: string) => {
    setScores(prev => ({ ...prev, [id]: parseInt(value, 10) }));
  };

  const calculateAverage = (): string => {
    const total = (Object.values(scores) as number[]).reduce((acc, curr) => acc + curr, 0);
    return (total / 10).toFixed(1);
  };

  const average = calculateAverage();
  const averageNum = parseFloat(average);

  const getMaturityLevel = (avg: number): MaturityLevel => {
    if (avg <= 4) return { text: "Iniciante / Crítico", color: "text-red-600", bgClass: "bg-red-50 border-red-200" };
    if (avg <= 7) return { text: "Em Desenvolvimento", color: "text-yellow-600", bgClass: "bg-yellow-50 border-yellow-200" };
    return { text: "Alta Performance", color: "text-orange-600", bgClass: "bg-orange-50 border-orange-200" };
  };

  const maturity = getMaturityLevel(averageNum);

  const handlePrint = () => {
    // Trigger browser print dialog which allows saving as PDF
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8 font-sans print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
        
        {/* Header */}
        <div className="bg-zinc-900 text-white p-6 md:p-8 print:bg-white print:text-black print:border-b-2 print:border-black flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 w-full md:w-auto text-center md:text-left">
            {/* Logo 1: White version for Dark Header */}
            <img 
              src="mev-white.png" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                // Fallback text if image missing
                const span = document.createElement('span');
                span.innerText = 'MEV.';
                span.className = 'text-4xl font-black mb-4 md:mb-0 md:mr-6 block';
                e.currentTarget.parentNode?.insertBefore(span, e.currentTarget);
              }}
              alt="MEV Logo" 
              className="h-16 md:h-20 mb-4 md:mb-0 md:mr-8 object-contain mx-auto md:mx-0 print:hidden" 
            />
            {/* Logo for Print (Black version) since print background is white */}
            <img 
              src="mev-black.png" 
              alt="MEV Logo Print"
              className="hidden print:block h-16 mb-4 mr-6 object-contain"
            />

            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500 tracking-tight leading-tight">Roda da Performance Comercial</h1>
              <p className="text-zinc-400 mt-2 text-sm md:text-base print:text-gray-600 font-light">
                ASEC = Avaliação Sistêmica da Estratégia Comercial
              </p>
            </div>
          </div>
          
          {/* Print Button - Visible on Mobile and Desktop */}
          <div className="flex gap-3 print:hidden w-full md:w-auto mt-6 md:mt-0 justify-center">
             <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 font-bold text-base w-full md:w-auto"
            >
              <Printer size={20} />
              <span>Gerar PDF / Imprimir</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row print:flex-col">
          
          {/* Column Left: Questions */}
          <div className="w-full lg:w-5/12 p-6 md:p-8 border-r border-zinc-100 bg-zinc-50/80 print:w-full print:bg-white print:border-none">
            <h2 className="text-xl font-bold text-zinc-800 mb-8 flex items-center gap-3 pb-4 border-b border-zinc-200">
              <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">1</span>
              Autoavaliação (0 a 10)
            </h2>
            
            <div className="space-y-6 print:grid print:grid-cols-2 print:gap-4 print:space-y-0">
              {questions.map((q, index) => (
                <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border border-zinc-200 hover:border-orange-200 hover:shadow-md transition-all duration-300 group print:break-inside-avoid print:shadow-none print:border-zinc-300">
                  <div className="flex justify-between items-start mb-4">
                    <label className="text-sm font-semibold text-zinc-700 flex-1 leading-relaxed pr-4">
                      <span className="text-orange-600 mr-1">{index + 1}.</span> {q.fullText}
                    </label>
                    <span 
                      className={`font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                        scores[q.id] < 5 
                          ? 'bg-red-50 text-red-600 border border-red-100' 
                          : scores[q.id] < 8 
                            ? 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                            : 'bg-orange-50 text-orange-600 border border-orange-100'
                      }`}
                    >
                      {scores[q.id]}
                    </span>
                  </div>
                  
                  <div className="relative pt-1 print:hidden">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={scores[q.id]}
                      onChange={(e) => handleScoreChange(q.id, e.target.value)}
                      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                    />
                    <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-zinc-400 mt-2">
                      <span>Crítico (0)</span>
                      <span>Excelente (10)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Right: Chart */}
          <div className="w-full lg:w-7/12 p-6 md:p-8 flex flex-col items-center bg-white print:break-before-page print:w-full print:block">
            <h2 className="text-xl font-bold text-zinc-800 mb-6 flex items-center gap-3 self-start w-full pb-4 border-b border-zinc-100 print:hidden">
              <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">2</span>
              Resultado Gráfico
            </h2>

            {/* Score Card */}
            <div className={`mb-8 text-center px-10 py-6 rounded-2xl border ${maturity.bgClass} w-full max-w-md shadow-sm transition-colors duration-500 print:mx-auto print:border-black print:bg-white`}>
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-2">Média Geral</p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-6xl font-black text-zinc-800 tracking-tighter">{average}</div>
                <div className="h-12 w-px bg-zinc-300"></div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 mb-1">Classificação</p>
                  <p className={`font-bold text-lg leading-none ${maturity.color} print:text-black`}>{maturity.text}</p>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="w-full h-[450px] md:h-[600px] relative print:h-[500px] print:break-inside-avoid">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                  <PolarGrid stroke="#e4e4e7" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={({ x, y, payload, textAnchor }) => (
                       <text
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        fill="#3f3f46"
                        fontSize={11}
                        fontWeight={600}
                        style={{ userSelect: 'none' }}
                      >
                        {payload.value}
                      </text>
                    )} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#ea580c" // Orange 600
                    strokeWidth={3}
                    fill="#fb923c" // Orange 400
                    fillOpacity={0.5}
                    isAnimationActive={false} // Disabled animation for better printing
                  />
                </RadarChart>
              </ResponsiveContainer>
              
              {/* Watermark Logo (Center) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-10 w-64">
                 <img 
                  src="mev-black.png" 
                  alt="Watermark" 
                  className="w-full h-auto object-contain grayscale"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>

            {/* Analysis Section */}
            <div className="mt-8 bg-zinc-50 p-6 rounded-xl border border-zinc-200 w-full text-sm text-zinc-700 print:border-black print:bg-white print:text-black shadow-sm print:break-inside-avoid">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-orange-700 print:text-black">
                <HelpCircle size={20} className="text-orange-600 print:text-black"/> Análise Rápida
              </h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong className="text-zinc-900 block mb-1">1. O formato da roda:</strong> 
                  Se a roda fosse o pneu do carro da sua empresa, como seria a viagem? (Trepidadora? Lenta? Suave?). Uma roda equilibrada, mesmo que pequena, roda melhor que uma roda grande e deformada.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-zinc-900 block mb-1">2. A Alavanca de Crescimento:</strong> 
                  Identifique a fatia com nota baixa que, se melhorada, impactaria positivamente todas as outras áreas.
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-200 print:mt-10">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-zinc-400 print:hidden"/>
                  <p className="font-bold text-zinc-800 uppercase text-xs tracking-wider">Compromisso de Ação</p>
                </div>
                <div className="h-24 bg-white border-2 border-dashed border-zinc-300 rounded-lg mt-2 p-4 print:border-black">
                  <p className="text-zinc-400 italic text-xs pointer-events-none print:hidden">Escreva aqui qual ação prática você tomará nas próximas 24 horas...</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-zinc-50 p-6 text-center text-zinc-400 text-xs border-t border-zinc-200 print:bg-white print:text-black print:border-t print:border-black print:mt-8">
          <p className="font-bold text-zinc-600 mb-1 text-sm print:text-black">MEV GROWTH TREINAMENTOS</p>
          <p className="mb-1">ASEC = Avaliação Sistêmica da Estratégia Comercial &copy; {new Date().getFullYear()}</p>
          <p>CNPJ : 54511678000168</p>
        </div>

      </div>
    </div>
  );
};

export default CommercialWheel;