
import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, UserCheck } from "lucide-react";
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

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  turno: string;
  ativo: boolean;
}

interface Props {
  onBack: () => void;
}

export const FuncionariosManager = ({ onBack }: Props) => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    {
      id: 1,
      nome: "Dr. João Santos",
      cargo: "Geriatra",
      telefone: "(11) 99999-9999",
      email: "joao@clinica.com",
      turno: "Manhã",
      ativo: true
    },
    {
      id: 2,
      nome: "Enfª Maria Silva",
      cargo: "Enfermeira",
      telefone: "(11) 88888-8888",
      email: "maria@clinica.com",
      turno: "Tarde",
      ativo: true
    },
    {
      id: 3,
      nome: "Ana Costa",
      cargo: "Fisioterapeuta",
      telefone: "(11) 77777-7777",
      email: "ana@clinica.com",
      turno: "Integral",
      ativo: false
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    telefone: "",
    email: "",
    turno: "Manhã"
  });

  const handleSubmit = () => {
    if (editingFuncionario) {
      setFuncionarios(prev => prev.map(f => 
        f.id === editingFuncionario.id 
          ? { ...f, ...formData }
          : f
      ));
    } else {
      const newFuncionario: Funcionario = {
        id: Date.now(),
        ...formData,
        ativo: true
      };
      setFuncionarios(prev => [...prev, newFuncionario]);
    }
    
    setIsDialogOpen(false);
    setEditingFuncionario(null);
    setFormData({ nome: "", cargo: "", telefone: "", email: "", turno: "Manhã" });
  };

  const handleEdit = (funcionario: Funcionario) => {
    setEditingFuncionario(funcionario);
    setFormData({
      nome: funcionario.nome,
      cargo: funcionario.cargo,
      telefone: funcionario.telefone,
      email: funcionario.email,
      turno: funcionario.turno
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setFuncionarios(prev => prev.filter(f => f.id !== id));
  };

  const toggleStatus = (id: number) => {
    setFuncionarios(prev => prev.map(f => 
      f.id === id ? { ...f, ativo: !f.ativo } : f
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold">Gerenciar Funcionários</h2>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingFuncionario(null);
              setFormData({ nome: "", cargo: "", telefone: "", email: "", turno: "Manhã" });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFuncionario ? "Editar Funcionário" : "Novo Funcionário"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="turno">Turno</Label>
                <select
                  id="turno"
                  value={formData.turno}
                  onChange={(e) => setFormData(prev => ({ ...prev, turno: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingFuncionario ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Turno</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id}>
                <TableCell className="font-medium">{funcionario.nome}</TableCell>
                <TableCell>{funcionario.cargo}</TableCell>
                <TableCell>{funcionario.telefone}</TableCell>
                <TableCell>{funcionario.email}</TableCell>
                <TableCell>{funcionario.turno}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    funcionario.ativo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {funcionario.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(funcionario)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStatus(funcionario.id)}
                    >
                      <UserCheck className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(funcionario.id)}
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
