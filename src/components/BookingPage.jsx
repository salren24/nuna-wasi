import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { tourIncludes } from "../data/content";
import { supabase } from "../lib/supabaseClient";

const ADULT_PRICE = 25;
const CHILD_PRICE = 15;
const DEPOSIT_RATE = 0.5;
const WEEKDAYS = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
const GROUP_CAPACITY = 15;
const MIN_LEAD_DAYS = 3;

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildCalendarDays(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
}

function ParticipantRow({ label, priceLabel, value, min, onDecrement, onIncrement }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-outline-variant/30 bg-surface/30">
      <div>
        <p className="font-label-md text-label-md text-on-surface">{label}</p>
        <p className="font-body-md text-body-md text-on-surface-variant">{priceLabel}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <span className="font-headline-sm text-headline-sm min-w-[2ch] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-all shadow-md flex items-center justify-center"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}

export default function BookingPage() {
  useEffect(() => {
    document.title = "Reserva tu Experiencia - Nuna Wasi";
    return () => {
      document.title = "Nuna Wasi - Alma de la Colmena";
    };
  }, []);

  const today = useMemo(() => startOfDay(new Date()), []);
  const minBookableDate = useMemo(() => addDays(today, MIN_LEAD_DAYS), [today]);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [availability, setAvailability] = useState({});
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const calendarDays = useMemo(() => buildCalendarDays(viewDate), [viewDate]);
  const monthLabel = viewDate
    .toLocaleDateString("es-PE", { month: "long", year: "numeric" })
    .replace(/^./, (c) => c.toUpperCase());

  useEffect(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const rangeStart = toDateKey(new Date(year, month, 1));
    const rangeEnd = toDateKey(new Date(year, month + 1, 0));

    let cancelled = false;
    supabase
      .rpc("get_booking_availability", { p_start: rangeStart, p_end: rangeEnd })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const map = {};
        data.forEach((row) => {
          map[row.tour_date] = Number(row.total_participants);
        });
        setAvailability(map);
      });

    return () => {
      cancelled = true;
    };
  }, [viewDate]);

  const subtotal = adults * ADULT_PRICE + children * CHILD_PRICE;
  const depositDue = subtotal * DEPOSIT_RATE;
  const balanceDue = subtotal - depositDue;

  const changeMonth = (delta) =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));

  const handleFieldChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || adults + children === 0 || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from("bookings").insert({
      tour_date: toDateKey(selectedDate),
      adults,
      children,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes || null,
      subtotal,
      deposit_due: depositDue,
      balance_due: balanceDue,
    });

    if (error) {
      console.error("Error al crear la reserva:", error);
      setSubmitError(
        "No pudimos registrar tu reserva. Por favor intenta de nuevo en unos minutos."
      );
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="font-body-md overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="max-w-container-max mx-auto px-6 md:px-16 mb-16 text-center">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Reserva tu Experiencia
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Conéctate con la esencia de las abejas en nuestro Tour Vivencial de Apiturismo.
            Un viaje sensorial por el alma de la colmena.
          </p>
        </section>

        <section className="max-w-container-max mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <div className="bg-white rounded-xl p-8 elevation-l2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">calendar_today</span>
                  1. Selecciona la Fecha
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    aria-label="Mes anterior"
                    className="p-2 rounded-full hover:bg-surface transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <span className="font-label-md text-label-md capitalize">{monthLabel}</span>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label="Mes siguiente"
                    className="p-2 rounded-full hover:bg-surface transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-label-md text-label-md">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="py-2 text-on-surface-variant/50">
                    {day}
                  </div>
                ))}
                {calendarDays.map((date, index) => {
                  if (!date) return <div key={`blank-${index}`} className="py-4" />;
                  const dateKey = toDateKey(date);
                  const isPast = date < today;
                  const isSaturday = date.getDay() === 6;
                  const isTooSoon = date < minBookableDate;
                  const bookedCount = availability[dateKey] || 0;
                  const isFull = bookedCount >= GROUP_CAPACITY;
                  const isDisabled = isPast || isSaturday || isTooSoon || isFull;
                  const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

                  let title;
                  if (isFull) title = "Cupo completo";
                  else if (isSaturday) title = "No disponible los sábados";
                  else if (isTooSoon) title = `Requiere ${MIN_LEAD_DAYS} días de anticipación`;

                  return (
                    <button
                      type="button"
                      key={dateKey}
                      disabled={isDisabled}
                      title={title}
                      onClick={() => setSelectedDate(date)}
                      className={`py-4 rounded-lg transition-colors ${
                        isDisabled
                          ? "text-on-surface-variant/30 cursor-not-allowed"
                          : isSelected
                          ? "bg-primary-container text-on-primary-container font-bold shadow-md"
                          : "hover:bg-surface-container cursor-pointer"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 elevation-l2">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined">groups</span>
                2. Participantes
              </h3>
              <div className="space-y-6">
                <ParticipantRow
                  label="Adultos"
                  priceLabel="S/ 25.00 por persona"
                  value={adults}
                  min={0}
                  onDecrement={() => setAdults((n) => Math.max(0, n - 1))}
                  onIncrement={() => setAdults((n) => n + 1)}
                />
                <ParticipantRow
                  label="Niños 4-12 años"
                  priceLabel="S/ 15.00 por niño"
                  value={children}
                  min={0}
                  onDecrement={() => setChildren((n) => Math.max(0, n - 1))}
                  onIncrement={() => setChildren((n) => n + 1)}
                />
              </div>
            </div>

            <div className="bg-tertiary/5 rounded-xl p-8 border border-tertiary-container/30">
              <h3 className="font-headline-sm text-headline-sm text-tertiary mb-6">
                ¿Qué incluye tu reserva?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourIncludes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary bg-white p-1 rounded-md shadow-sm">
                      check_circle
                    </span>
                    <p className="font-body-md text-body-md">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-8 elevation-l3 border border-primary/5 sticky top-32">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined">person</span>
                3. Información de Contacto
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-tertiary text-5xl mb-4">
                    check_circle
                  </span>
                  <p className="font-headline-sm text-headline-sm text-primary mb-2">
                    ¡Solicitud enviada!
                  </p>
                  <p className="font-body-md text-on-surface-variant">
                    Te contactaremos pronto para confirmar tu reserva del{" "}
                    {selectedDate?.toLocaleDateString("es-PE", {
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    y coordinar el pago del depósito.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface-variant mb-2"
                      htmlFor="fullName"
                    >
                      Nombre Completo
                    </label>
                    <input
                      id="fullName"
                      required
                      type="text"
                      placeholder="Ej. Maria Garcia"
                      value={formData.fullName}
                      onChange={handleFieldChange("fullName")}
                      className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface-variant mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleFieldChange("email")}
                        className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface-variant mb-2"
                        htmlFor="phone"
                      >
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        required
                        type="tel"
                        placeholder="+51 999 999 999"
                        value={formData.phone}
                        onChange={handleFieldChange("phone")}
                        className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface-variant mb-2"
                      htmlFor="notes"
                    >
                      Solicitudes Especiales / Notas
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Alergias, requerimientos especiales..."
                      value={formData.notes}
                      onChange={handleFieldChange("notes")}
                      className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="border-t border-dashed border-outline-variant pt-8 mt-8">
                    <div className="space-y-3">
                      <div className="flex justify-between font-body-md text-body-md">
                        <span className="text-on-surface-variant">
                          Subtotal ({adults} adulto{adults !== 1 ? "s" : ""}
                          {children > 0
                            ? `, ${children} niño${children !== 1 ? "s" : ""}`
                            : ""}
                          )
                        </span>
                        <span>S/ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-body-md text-body-md text-tertiary">
                        <span>Saldo pendiente (día del tour)</span>
                        <span>-S/ {balanceDue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                        <div className="font-headline-sm text-headline-sm text-primary">
                          Total a pagar ahora
                        </div>
                        <div className="font-headline-sm text-headline-sm text-primary">
                          S/ {depositDue.toFixed(2)}
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant text-right">
                        * El 50% de depósito asegura tu lugar.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-low rounded-lg p-4 mt-6">
                    <h4 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">info</span>
                      Instrucciones de Pago
                    </h4>
                    <p className="font-body-md text-[14px] leading-relaxed text-on-surface-variant">
                      Por favor, realice el depósito vía <strong>Yape, Plin</strong> o
                      transferencia bancaria. Adjunte el comprobante una vez realizado el pago
                      para confirmar su reserva.
                    </p>
                  </div>

                  {!selectedDate && (
                    <p className="text-sm text-error text-center">
                      Selecciona una fecha disponible para continuar.
                    </p>
                  )}
                  {selectedDate && adults + children === 0 && (
                    <p className="text-sm text-error text-center">
                      Agrega al menos un participante para continuar.
                    </p>
                  )}
                  {submitError && (
                    <p className="text-sm text-error text-center">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedDate || adults + children === 0 || submitting}
                    className="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
                  >
                    {submitting ? "Enviando..." : "Confirmar y Pagar Depósito"}
                    {!submitting && (
                      <span className="material-symbols-outlined">arrow_forward</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-6 md:px-16 mt-24">
          <div className="max-w-3xl">
            <h4 className="font-headline-sm text-headline-sm text-primary mb-4">
              Política de Cancelación
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Entendemos que los planes pueden cambiar. Ofrecemos reembolsos completos o
              reprogramaciones sin cargo para cancelaciones realizadas con un mínimo de{" "}
              <strong>7 días de anticipación</strong>. Las cancelaciones posteriores a este
              periodo podrían incurrir en la pérdida del depósito de reserva.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
