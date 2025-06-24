
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Shield, Code, Smartphone, Cloud, Headphones } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Performance Ultra-Rápida",
    description: "Otimização avançada para carregamento instantâneo e experiência fluida",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção completa com criptografia de ponta e monitoramento 24/7",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Código Limpo",
    description: "Desenvolvimento com as melhores práticas e padrões da indústria",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Smartphone,
    title: "Design Responsivo",
    description: "Interface adaptável para todos os dispositivos e tamanhos de tela",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description: "Infraestrutura moderna na nuvem com escalabilidade automática",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Atendimento especializado disponível a qualquer hora do dia",
    gradient: "from-teal-500 to-blue-500"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recursos
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Extraordinários</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tudo o que você precisa para criar experiências digitais incríveis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-slate-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300 mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
