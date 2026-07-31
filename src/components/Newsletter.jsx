import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por unirte!");
    setEmail("");
  };

  return (
    <section className="py-24 px-6 md:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary opacity-5" />
      <div className="max-w-container-max mx-auto relative z-10">
        <div className="bg-primary text-surface rounded-[2rem] p-12 md:p-20 text-center flex flex-col items-center shadow-2xl">
          <span className="material-symbols-outlined text-6xl mb-6">mail</span>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-4 text-surface">
            Únete a la colmena
          </h2>
          <p className="font-body-lg text-primary-fixed mb-10 max-w-xl">
            Recibe noticias sobre nuestras cosechas, consejos de bienestar natural y
            descuentos exclusivos para miembros.
          </p>
          <form
            className="flex flex-col md:flex-row w-full max-w-lg gap-4"
            onSubmit={handleSubmit}
          >
            <input
              className="flex-grow bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-surface placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
              placeholder="Tu correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-label-md hover:bg-inverse-primary transition-colors"
            >
              Suscribirse
            </button>
          </form>
          <p className="mt-6 text-primary-fixed text-xs opacity-60">
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
}
