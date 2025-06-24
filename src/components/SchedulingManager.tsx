
import { useState } from "react";
import { ArrowLeft, Plus, Calendar, Clock, User, Edit, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Agendamento {
  id: number;
  paciente: string;
  medico: string;
  data: string;
  hora: string;
  tipo: string;
  status: "agendado" | "confirmado" | "cancelado" | "concluido";
}

interface Props {
  onBack: () => void;
}

export const SchedulingManager = ({ onBack }: Props) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      paciente: "Maria Santos",
      medico: "Dr. João Santos",
      data: "2024-06-25",
      hora: "09:00",
      tipo: "Consulta Geriátrica",
      status: "agendado"
    },
    {
      id: 2,
      paciente: "Antônio Silva",
      medico: "Dr. João Santos",
      data: "2024-06-25",
      hora: "10:30",
      tipo: "Retorno",
      status: "confirmado"
    },
    {
      id: 3,
      paciente: "José Costa",
      medico: "Enfª Maria Silva",
      data: "2024-06-25",
      hora: "14:00",
      tipo: "Fisioterapia",
      status: "agendado"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
  const [formData, setFormData] = useState({
    paciente: "",
    medico: "",
    data: "",
    hora: "",
    tipo: "Consulta Geriátrica"
  });

  const handleSubmit = () => {
    if (editingAgendamento) {
      setAgendamentos(prev => prev.map(a => 
        a.id === editingAgendamento.id 
          ? { ...a, ...formData }
          : a
      ));
    } else {
      const newAgendamento: Agendamento = {
        id: Date.now(),
        ...formData,
        status: "agendado"
      };
      setAgendamentos(prev => [...prev, newAgendamento]);
    }
    
    setIsDialogOpen(false);
    setEditingAgendamento(null);
    setFormData({ paciente: "", medico: "", data: "", hora: "", tipo: "Consulta Geriátrica" });
  };

  const handleEdit = (agendamento: Agendamento) => {
    setEditingAgendamento(agendamento);
    setFormData({
      paciente: agendamento.paciente,
      medico: agendamento.medico,
      data: agendamento.data,
      hora: agendamento.hora,
      tipo: agendamento.tipo
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAgendamentos(prev => prev.filter(a => a.id !== id));
  };

  const updateStatus = (id: number, status: Agendamento["status"]) => {
    setAgendamentos(prev => prev.map(a => 
      a.id === id ? { ...a, status } : a
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado": return "bg-blue-100 text-blue-800";
      case "confirmado": return "bg-green-100 text-green-800";
      case "cancelado": return "bg-red-100 text-red-800";
      case "concluido": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
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
          <h2 className="text-2xl font-bold">Agendamento de Consultas</h2>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingAgendamento(null);
              setFormData({ paciente: "", medico: "", data: "", hora: "", tipo: "Consulta Geriátrica" });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAgendamento ? "Editar Agendamento" : "Nova Consulta"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="paciente">Paciente</Label>
                <Input
                  id="paciente"
                  value={formData.paciente}
                  onChange={(e) => setFormData(prev => ({ ...prev, paciente: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="medico">Médico/Profissional</Label>
                <select
                  id="medico"
                  value={formData.medico}
                  onChange={(e) => setFormData(prev => ({ ...prev, medico: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Selecione...</option>
                  <option value="Dr. João Santos">Dr. João Santos</option>
                  <option value="Enfª Maria Silva">Enfª Maria Silva</option>
                  <option value="Ana Costa">Ana Costa</option>
                </select>
              </div>
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="hora">Horário</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo de Consulta</Label>
                <select
                  id="tipo"
                  value={formData.tipo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Consulta Geriátrica">Consulta Geriátrica</option>
                  <option value="Retorno">Retorno</option>
                  <option value="Fisioterapia">Fisioterapia</option>
                  <option value="Avaliação">Avaliação</option>
                </select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingAgendamento ? "Salvar Alterações" : "Agendar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Agenda de Hoje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agendamentos.filter(a => a.data === "2024-06-25").map((agendamento) => (
            <div key={agendamento.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{agendamento.paciente}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agendamento.status)}`}>
                  {agendamento.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {agendamento.hora}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <User className="w-4 h-4 mr-1" />
                {agendamento.medico}
              </p>
              <p className="text-sm text-gray-500 mt-1">{agendamento.tipo}</p>
              <div className="flex space-x-1 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(agendamento.id, "confirmado")}
                >
                  <CheckCircle className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(agendamento)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Appointments Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendamentos.map((agendamento) => (
              <TableRow key={agendamento.id}>
                <TableCell className="font-medium">{agendamento.paciente}</TableCell>
                <TableCell>{agendamento.medico}</TableCell>
                <TableCell>{new Date(agendamento.data).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{agendamento.hora}</TableCell>
                <TableCell>{agendamento.tipo}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agendamento.status)}`}>
                    {agendamento.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(agendamento)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateStatus(agendamento.id, "concluido")}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(agendamento.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
