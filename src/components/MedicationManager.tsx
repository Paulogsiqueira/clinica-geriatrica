
import { useState } from "react";
import { ArrowLeft, Plus, Pill, Clock, User, Edit, Trash2, AlertTriangle } from "lucide-react";
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

interface Medicamento {
  id: number;
  nome: string;
  dosagem: string;
  paciente: string;
  medico: string;
  horarios: string[];
  dataInicio: string;
  dataFim: string;
  observacoes: string;
  status: "ativo" | "pausado" | "finalizado";
}

interface Props {
  onBack: () => void;
}

export const MedicationManager = ({ onBack }: Props) => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    {
      id: 1,
      nome: "Losartana",
      dosagem: "50mg",
      paciente: "Maria Santos",
      medico: "Dr. João Santos",
      horarios: ["08:00", "20:00"],
      dataInicio: "2024-06-01",
      dataFim: "2024-06-30",
      observacoes: "Tomar com água, longe das refeições",
      status: "ativo"
    },
    {
      id: 2,
      nome: "Metformina",
      dosagem: "850mg",
      paciente: "Antônio Silva",
      medico: "Dr. João Santos",
      horarios: ["12:00", "19:00"],
      dataInicio: "2024-06-10",
      dataFim: "2024-07-10",
      observacoes: "Tomar durante as refeições",
      status: "ativo"
    },
    {
      id: 3,
      nome: "Sinvastatina",
      dosagem: "20mg",
      paciente: "José Costa",
      medico: "Dr. João Santos",
      horarios: ["22:00"],
      dataInicio: "2024-05-15",
      dataFim: "2024-06-15",
      observacoes: "Tomar à noite",
      status: "finalizado"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedicamento, setEditingMedicamento] = useState<Medicamento | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    dosagem: "",
    paciente: "",
    medico: "",
    horarios: "",
    dataInicio: "",
    dataFim: "",
    observacoes: ""
  });

  const handleSubmit = () => {
    if (editingMedicamento) {
      setMedicamentos(prev => prev.map(m => 
        m.id === editingMedicamento.id 
          ? { ...m, ...formData, horarios: formData.horarios.split(",").map(h => h.trim()) }
          : m
      ));
    } else {
      const newMedicamento: Medicamento = {
        id: Date.now(),
        ...formData,
        horarios: formData.horarios.split(",").map(h => h.trim()),
        status: "ativo"
      };
      setMedicamentos(prev => [...prev, newMedicamento]);
    }
    
    setIsDialogOpen(false);
    setEditingMedicamento(null);
    setFormData({ nome: "", dosagem: "", paciente: "", medico: "", horarios: "", dataInicio: "", dataFim: "", observacoes: "" });
  };

  const handleEdit = (medicamento: Medicamento) => {
    setEditingMedicamento(medicamento);
    setFormData({
      nome: medicamento.nome,
      dosagem: medicamento.dosagem,
      paciente: medicamento.paciente,
      medico: medicamento.medico,
      horarios: medicamento.horarios.join(", "),
      dataInicio: medicamento.dataInicio,
      dataFim: medicamento.dataFim,
      observacoes: medicamento.observacoes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMedicamentos(prev => prev.filter(m => m.id !== id));
  };

  const updateStatus = (id: number, status: Medicamento["status"]) => {
    setMedicamentos(prev => prev.map(m => 
      m.id === id ? { ...m, status } : m
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-800";
      case "pausado": return "bg-yellow-100 text-yellow-800";
      case "finalizado": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMedicamentosProximosHorario = () => {
    const agora = new Date();
    const horaAtual = agora.getHours().toString().padStart(2, '0') + ':' + agora.getMinutes().toString().padStart(2, '0');
    
    return medicamentos.filter(m => 
      m.status === "ativo" && 
      m.horarios.some(h => h > horaAtual)
    ).slice(0, 3);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Controle de Medicamentos</h2>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingMedicamento(null);
              setFormData({ nome: "", dosagem: "", paciente: "", medico: "", horarios: "", dataInicio: "", dataFim: "", observacoes: "" });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Medicação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMedicamento ? "Editar Medicação" : "Nova Medicação"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome do Medicamento</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="dosagem">Dosagem</Label>
                  <Input
                    id="dosagem"
                    value={formData.dosagem}
                    onChange={(e) => setFormData(prev => ({ ...prev, dosagem: e.target.value }))}
                    placeholder="Ex: 50mg, 1 comprimido"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paciente">Paciente</Label>
                  <Input
                    id="paciente"
                    value={formData.paciente}
                    onChange={(e) => setFormData(prev => ({ ...prev, paciente: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="medico">Médico Responsável</Label>
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
              </div>
              <div>
                <Label htmlFor="horarios">Horários (separados por vírgula)</Label>
                <Input
                  id="horarios"
                  value={formData.horarios}
                  onChange={(e) => setFormData(prev => ({ ...prev, horarios: e.target.value }))}
                  placeholder="Ex: 08:00, 14:00, 20:00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataInicio">Data de Início</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData(prev => ({ ...prev, dataInicio: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="dataFim">Data de Fim</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) => setFormData(prev => ({ ...prev, dataFim: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Ex: Tomar com água, após as refeições..."
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingMedicamento ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Próximas Medicações */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Próximas Medicações
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getMedicamentosProximosHorario().map((medicamento) => (
            <div key={medicamento.id} className="border rounded-lg p-4 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{medicamento.nome}</h4>
                <AlertTriangle className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-sm text-gray-600 flex items-center mb-1">
                <User className="w-4 h-4 mr-1" />
                {medicamento.paciente}
              </p>
              <p className="text-sm text-gray-600 flex items-center mb-1">
                <Pill className="w-4 h-4 mr-1" />
                {medicamento.dosagem}
              </p>
              <p className="text-sm font-medium text-blue-600">
                Próximo: {medicamento.horarios[0]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de Medicamentos */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Dosagem</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Horários</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicamentos.map((medicamento) => (
              <TableRow key={medicamento.id}>
                <TableCell className="font-medium">{medicamento.nome}</TableCell>
                <TableCell>{medicamento.dosagem}</TableCell>
                <TableCell>{medicamento.paciente}</TableCell>
                <TableCell>{medicamento.medico}</TableCell>
                <TableCell>{medicamento.horarios.join(", ")}</TableCell>
                <TableCell>
                  {new Date(medicamento.dataInicio).toLocaleDateString('pt-BR')} - {new Date(medicamento.dataFim).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(medicamento.status)}`}>
                    {medicamento.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(medicamento)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateStatus(medicamento.id, medicamento.status === "ativo" ? "pausado" : "ativo")}
                    >
                      <Clock className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(medicamento.id)}
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
