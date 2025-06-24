
import { TrendingUp, Users, Zap, Globe } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "250+",
    label: "Projetos Entregues",
    color: "text-purple-400"
  },
  {
    icon: Users,
    value: "10K+",
    label: "Clientes Satisfeitos",
    color: "text-blue-400"
  },
  {
    icon: Zap,
    value: "99.9%",
    label: "Uptime Garantido",
    color: "text-green-400"
  },
  {
    icon: Globe,
    value: "50+",
    label: "Países Atendidos",
    color: "text-pink-400"
  }
];

export const Stats = () => {
  return (
    <section className="py-20 bg-slate-950 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
