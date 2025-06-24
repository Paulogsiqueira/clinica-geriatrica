
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-slate-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto Para
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Começar?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já transformaram seus negócios com nossa plataforma
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-400 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <Mail className="mr-2" size={20} />
              Falar com Vendas
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400">Confiado por:</div>
            {["Tech Corp", "Innovation Inc", "Future Labs", "Digital Pro"].map((company, index) => (
              <div key={index} className="text-gray-500 font-semibold">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
