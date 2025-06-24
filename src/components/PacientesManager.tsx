
import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Calendar } from "lucide-react";
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

interface Paciente {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  responsavel: string;
  condicao: string;
  dataInternacao: string;
  quarto: string;
}

interface Props {
  onBack: () => void;
}

export const PacientesManager = ({ onBack }: Props) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "Maria da Silva",
      idade: 78,
      telefone: "(11) 99999-1111",
      responsavel: "João Silva (Filho)",
      condicao: "Hipertensão",
      dataInternacao: "2024-01-15",
      quarto: "101A"
    },
    {
      id: 2,
      nome: "Antônio Costa",
      idade: 82,
      telefone: "(11) 88888-2222",
      responsavel: "Ana Costa (Filha)",
      condicao: "Diabetes",
      dataInternacao: "2024-02-20",
      quarto: "102B"
    },
    {
      id: 3,
      nome: "Rosa Santos",
      idade: 75,
      telefone: "(11) 77777-3333",
      responsavel: "Carlos Santos (Neto)",
      condicao: "Alzheimer",
      dataInternacao: "2024-03-10",
      quarto: "103A"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    telefone: "",
    responsavel: "",
    condicao: "",
    dataInternacao: "",
    quarto: ""
  });

  const handleSubmit = () => {
    if (editingPaciente) {
      setPacientes(prev => prev.map(p => 
        p.id === editingPaciente.id 
          ? { ...p, ...formData, idade: parseInt(formData.idade) }
          : p
      ));
    } else {
      const newPaciente: Paciente = {
        id: Date.now(),
        ...formData,
        idade: parseInt(formData.idade)
      };
      setPacientes(prev => [...prev, newPaciente]);
    }
    
    setIsDialogOpen(false);
    setEditingPaciente(null);
    setFormData({
      nome: "",
      idade: "",
      telefone: "",
      responsavel: "",
      condicao: "",
      dataInternacao: "",
      quarto: ""
    });
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente);
    setFormData({
      nome: paciente.nome,
      idade: paciente.idade.toString(),
      telefone: paciente.telefone,
      responsavel: paciente.responsavel,
      condicao: paciente.condicao,
      dataInternacao: paciente.dataInternacao,
      quarto: paciente.quarto
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setPacientes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Gerenciar Pacientes</h2>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPaciente(null);
              setFormData({
                nome: "",
                idade: "",
                telefone: "",
                responsavel: "",
                condicao: "",
                dataInternacao: "",
                quarto: ""
              });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPaciente ? "Editar Paciente" : "Novo Paciente"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  type="number"
                  value={formData.idade}
                  onChange={(e) => setFormData(prev => ({ ...prev, idade: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="condicao">Condição Médica</Label>
                <Input
                  id="condicao"
                  value={formData.condicao}
                  onChange={(e) => setFormData(prev => ({ ...prev, condicao: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="dataInternacao">Data de Internação</Label>
                <Input
                  id="dataInternacao"
                  type="date"
                  value={formData.dataInternacao}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataInternacao: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="quarto">Quarto</Label>
                <Input
                  id="quarto"
                  value={formData.quarto}
                  onChange={(e) => setFormData(prev => ({ ...prev, quarto: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <Button onClick={handleSubmit} className="w-full">
                  {editingPaciente ? "Salvar Alterações" : "Cadastrar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Condição</TableHead>
              <TableHead>Internação</TableHead>
              <TableHead>Quarto</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell className="font-medium">{paciente.nome}</TableCell>
                <TableCell>{paciente.idade} anos</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell>{paciente.responsavel}</TableCell>
                <TableCell>{paciente.condicao}</TableCell>
                <TableCell>{new Date(paciente.dataInternacao).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{paciente.quarto}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(paciente)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(paciente.id)}
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
