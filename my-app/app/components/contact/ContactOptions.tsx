import React from "react";
import { Mail, MapPin } from "lucide-react";

const ContactOptions = () => {
  const options = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Par Email",
      desc: "Pour des questions générales ou des retours sur l'application.",
      action: "contact@cesizen.fr",
      href: "mailto:contact@cesizen.fr",
      colorClass: "bg-green-100 text-green-600",
      linkClass: "text-green-600 hover:text-green-700",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Sur le Campus",
      desc: "Retrouvez l'équipe BDE ou les référents bien-être au foyer.",
      action: "Campus CESI",
      href: null, // Pas de lien, juste du texte
      colorClass: "bg-yellow-100 text-yellow-600",
      linkClass: "text-gray-900 cursor-default",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {options.map((opt, index) => (
        <div 
          key={index} 
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${opt.colorClass}`}>
            {opt.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{opt.title}</h3>
          <p className="text-gray-500 mb-6 text-sm">
            {opt.desc}
          </p>
          
          {opt.href ? (
            <a href={opt.href} className={`font-semibold hover:underline ${opt.linkClass}`}>
              {opt.action}
            </a>
          ) : (
            <span className={`font-medium ${opt.linkClass}`}>
              {opt.action}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactOptions;