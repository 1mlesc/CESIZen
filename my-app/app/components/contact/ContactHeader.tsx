import React from "react";

const ContactHeader = () => {
  return (
    <section className="text-center max-w-3xl mx-auto px-4 mb-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Contactez l&apos;équipe <span className="text-green-600">CESI Zen</span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Vous avez une question, une suggestion ou simplement envie de discuter ? 
        Nous sommes là pour vous écouter. Choisissez le moyen qui vous convient le mieux.
      </p>
    </section>
  );
};

export default ContactHeader;