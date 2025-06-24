
import { useState } from "react";
import { Users, UserCheck, Calendar, Activity, BarChart3, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FuncionariosManager } from "./FuncionariosManager";
import { PacientesManager } from "./PacientesManager";
import { ReportsManager } from "./ReportsManager";
import { SchedulingManager } from "./SchedulingManager";
import { MedicationManager } from "./MedicationManager";

type Section = "dashboard" | "funcionarios" | "pacientes" | "relatorios" | "agendamentos" | "medicamentos";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  const stats = [
    {
      title: "Total de Pacientes",
      value: "156",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Funcionários Ativos",
      value: "24",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Consultas Hoje",
      value: "32",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Emergências",
      value: "3",
      icon: Activity,
      color: "text-red-600"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "funcionarios":
        return <FuncionariosManager onBack={() => setActiveSection("dashboard")} />;
      case "pacientes":
        return <PacientesManager onBack={() => setActiveSection("dashboard")} />;
      case "relatorios":
        return <ReportsManager onBack={() => setActiveSection("dashboard")} />;
      case "agendamentos":
        return <SchedulingManager onBack={() => setActiveSection("dashboard")} />;
      case "medicamentos":
        return <MedicationManager onBack={() => setActiveSection("dashboard")} />;
      default:
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setActiveSection("funcionarios")}
                  className="h-16 text-lg"
                  variant="outline"
                >
                  <UserCheck className="mr-2 w-5 h-5" />
                  Gerenciar Funcionários
                </Button>
                <Button 
                  onClick={() => setActiveSection("pacientes")}
                  className="h-16 text-lg"
                  variant="outline"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Gerenciar Pacientes
                </Button>
                <Button 
                  onClick={() => setActiveSection("agendamentos")}
                  className="h-16 text-lg"
                  variant="outline"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Agendamentos
                </Button>
                <Button 
                  onClick={() => setActiveSection("medicamentos")}
                  className="h-16 text-lg"
                  variant="outline"
                >
                  <Pill className="mr-2 w-5 h-5" />
                  Medicamentos
                </Button>
                <Button 
                  onClick={() => setActiveSection("relatorios")}
                  className="h-16 text-lg"
                  variant="outline"
                >
                  <BarChart3 className="mr-2 w-5 h-5" />
                  Relatórios
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Atividades Recentes</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Consulta agendada para Maria Silva - 14:30</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span>Dr. João Santos iniciou o turno</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <span>Medicação administrada para Antônio Costa</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Pill className="w-5 h-5 text-orange-600" />
                  <span>Lembrete: Losartana para Maria Santos às 20:00</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Clínica Geriátrica Recanto dos Sonhos
              </h1>
            </div>
            <nav className="flex space-x-2">
              <Button
                variant={activeSection === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveSection("dashboard")}
                size="sm"
              >
                Dashboard
              </Button>
              <Button
                variant={activeSection === "funcionarios" ? "default" : "ghost"}
                onClick={() => setActiveSection("funcionarios")}
                size="sm"
              >
                Funcionários
              </Button>
              <Button
                variant={activeSection === "pacientes" ? "default" : "ghost"}
                onClick={() => setActiveSection("pacientes")}
                size="sm"
              >
                Pacientes
              </Button>
              <Button
                variant={activeSection === "agendamentos" ? "default" : "ghost"}
                onClick={() => setActiveSection("agendamentos")}
                size="sm"
              >
                Agendamentos
              </Button>
              <Button
                variant={activeSection === "medicamentos" ? "default" : "ghost"}
                onClick={() => setActiveSection("medicamentos")}
                size="sm"
              >
                Medicamentos
              </Button>
              <Button
                variant={activeSection === "relatorios" ? "default" : "ghost"}
                onClick={() => setActiveSection("relatorios")}
                size="sm"
              >
                Relatórios
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
