import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";

const FaqList = () => {
  const faqs = [
    {
      question: "L'application est-elle gratuite ?",
      answer: "Oui, CESI Zen est 100% gratuite, développée par des étudiants pour la communauté."
    },
    {
      question: "Mes données sont-elles privées ?",
      answer: "Absolument. Nous sommes conformes au RGPD et ne partageons jamais vos informations.",
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
        <HelpCircle className="w-6 h-6 text-green-600" />
        Questions Fréquentes
      </h2>
      
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-100 transition-colors">
            <h4 className="font-bold text-gray-900 mb-2">{item.question}</h4>
            <p className="text-gray-600 text-sm">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqList;