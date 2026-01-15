import React from "react";
import ContactHeader from "../../components/contact/ContactHeader";
import ContactOptions from "../../components/contact/ContactOptions";
import FaqList from "../../components/contact/FaqList";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Container principal avec le padding top pour la navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        
        {/* 1. Titre et Intro */}
        <ContactHeader />

        {/* 2. Grille des moyens de contact */}
        <ContactOptions />

        {/* 3. FAQ Rapide */}
        <FaqList />

      </div>
    </div>
  );
};

export default ContactPage;