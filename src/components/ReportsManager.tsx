
import { useState } from "react";
import { ArrowLeft, BarChart3, PieChart, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line,
  Pie
} from "recharts";

interface Props {
  onBack: () => void;
}

const consultasData = [
  { mes: "Jan", consultas: 45, faturamento: 12000 },
  { mes: "Fev", consultas: 52, faturamento: 14500 },
  { mes: "Mar", consultas: 38, faturamento: 11200 },
  { mes: "Abr", consultas: 61, faturamento: 16800 },
  { mes: "Mai", consultas: 49, faturamento: 13900 },
  { mes: "Jun", consultas: 58, faturamento: 15600 }
];

const especialidadesData = [
  { name: "Geriatria", value: 45, color: "#8884d8" },
  { name: "Cardiologia", value: 30, color: "#82ca9d" },
  { name: "Fisioterapia", value: 25, color: "#ffc658" }
];

export const ReportsManager = ({ onBack }: Props) => {
  const [activeReport, setActiveReport] = useState("consultas");

  const renderChart = () => {
    switch (activeReport) {
      case "consultas":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consultasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consultas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "faturamento":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={consultasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="faturamento" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      case "especialidades":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={especialidadesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {especialidadesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Relatórios e Dashboards</h2>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="flex space-x-2">
        <Button
          variant={activeReport === "consultas" ? "default" : "outline"}
          onClick={() => setActiveReport("consultas")}
          className="flex items-center"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Consultas
        </Button>
        <Button
          variant={activeReport === "faturamento" ? "default" : "outline"}
          onClick={() => setActiveReport("faturamento")}
          className="flex items-center"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Faturamento
        </Button>
        <Button
          variant={activeReport === "especialidades" ? "default" : "outline"}
          onClick={() => setActiveReport("especialidades")}
          className="flex items-center"
        >
          <PieChart className="w-4 h-4 mr-2" />
          Especialidades
        </Button>
      </div>

      {/* Chart Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 capitalize">
          Relatório de {activeReport}
        </h3>
        {renderChart()}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Consultas</p>
              <p className="text-2xl font-bold">303</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Faturamento Total</p>
              <p className="text-2xl font-bold">R$ 84.000</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Média por Consulta</p>
              <p className="text-2xl font-bold">R$ 277</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
