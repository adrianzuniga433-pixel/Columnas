// Diálogos de la vida real para practicar conversación. Cada línea trae el
// inglés y su traducción. El audio se sintetiza con la Web Speech API.

export interface DialogueLine {
  speaker: string; // "A" | "B" (etiqueta del personaje)
  who: string; // descripción corta (Tú / Mesero...)
  en: string;
  es: string;
}

export interface Dialogue {
  id: string;
  title: string;
  situation: string;
  level: string;
  lines: DialogueLine[];
}

export const dialogues: Dialogue[] = [
  {
    id: "cafe",
    title: "En la cafetería",
    situation: "Pides un café para llevar.",
    level: "Básico",
    lines: [
      { speaker: "B", who: "Barista", en: "Hi! What can I get you?", es: "¡Hola! ¿Qué te sirvo?" },
      { speaker: "A", who: "Tú", en: "Hi! I'd like a medium coffee, please.", es: "¡Hola! Quisiera un café mediano, por favor." },
      { speaker: "B", who: "Barista", en: "For here or to go?", es: "¿Para aquí o para llevar?" },
      { speaker: "A", who: "Tú", en: "To go, please. And a chocolate muffin.", es: "Para llevar, por favor. Y un muffin de chocolate." },
      { speaker: "B", who: "Barista", en: "Sure. That's five dollars.", es: "Claro. Son cinco dólares." },
      { speaker: "A", who: "Tú", en: "Here you are. Thank you!", es: "Aquí tiene. ¡Gracias!" },
    ],
  },
  {
    id: "meeting",
    title: "Conociendo a alguien",
    situation: "Te presentas con una persona nueva.",
    level: "Básico",
    lines: [
      { speaker: "B", who: "Persona", en: "Hi, I don't think we've met. I'm Laura.", es: "Hola, creo que no nos conocemos. Soy Laura." },
      { speaker: "A", who: "Tú", en: "Nice to meet you, Laura. I'm Carlos.", es: "Mucho gusto, Laura. Soy Carlos." },
      { speaker: "B", who: "Persona", en: "Where are you from, Carlos?", es: "¿De dónde eres, Carlos?" },
      { speaker: "A", who: "Tú", en: "I'm from Mexico. And you?", es: "Soy de México. ¿Y tú?" },
      { speaker: "B", who: "Persona", en: "I'm from Spain. What do you do?", es: "Soy de España. ¿A qué te dedicas?" },
      { speaker: "A", who: "Tú", en: "I work as a designer. It was great to meet you!", es: "Trabajo como diseñador. ¡Fue un gusto conocerte!" },
    ],
  },
  {
    id: "directions",
    title: "Pidiendo direcciones",
    situation: "Preguntas cómo llegar a la estación de tren.",
    level: "Básico",
    lines: [
      { speaker: "A", who: "Tú", en: "Excuse me, where is the train station?", es: "Disculpe, ¿dónde está la estación de tren?" },
      { speaker: "B", who: "Local", en: "Go straight for two blocks, then turn left.", es: "Sigue recto dos cuadras y luego gira a la izquierda." },
      { speaker: "A", who: "Tú", en: "Is it far from here?", es: "¿Está lejos de aquí?" },
      { speaker: "B", who: "Local", en: "No, it's about five minutes on foot.", es: "No, son unos cinco minutos a pie." },
      { speaker: "A", who: "Tú", en: "Great. Thank you so much!", es: "Genial. ¡Muchas gracias!" },
      { speaker: "B", who: "Local", en: "You're welcome. Have a nice day!", es: "De nada. ¡Que tengas buen día!" },
    ],
  },
  {
    id: "shopping",
    title: "De compras (ropa)",
    situation: "Compras una camisa en una tienda.",
    level: "Intermedio",
    lines: [
      { speaker: "B", who: "Vendedor", en: "Hello! Can I help you find anything?", es: "¡Hola! ¿Le ayudo a encontrar algo?" },
      { speaker: "A", who: "Tú", en: "Yes, I'm looking for a blue shirt.", es: "Sí, estoy buscando una camisa azul." },
      { speaker: "B", who: "Vendedor", en: "What size are you?", es: "¿Qué talla usa?" },
      { speaker: "A", who: "Tú", en: "Medium, I think. Can I try it on?", es: "Mediana, creo. ¿Me la puedo probar?" },
      { speaker: "B", who: "Vendedor", en: "Of course. The fitting rooms are over there.", es: "Por supuesto. Los probadores están por allá." },
      { speaker: "A", who: "Tú", en: "It fits well. How much is it?", es: "Me queda bien. ¿Cuánto cuesta?" },
      { speaker: "B", who: "Vendedor", en: "It's twenty dollars, and it's on sale.", es: "Cuesta veinte dólares, y está en oferta." },
    ],
  },
  {
    id: "airport",
    title: "En el aeropuerto",
    situation: "Haces el check-in para tu vuelo.",
    level: "Intermedio",
    lines: [
      { speaker: "B", who: "Agente", en: "Good morning. May I see your passport, please?", es: "Buenos días. ¿Me permite su pasaporte, por favor?" },
      { speaker: "A", who: "Tú", en: "Here you are. I'd like to check in for my flight.", es: "Aquí tiene. Quisiera hacer el check-in de mi vuelo." },
      { speaker: "B", who: "Agente", en: "How many bags are you checking?", es: "¿Cuántas maletas va a documentar?" },
      { speaker: "A", who: "Tú", en: "Just one. Can I have a window seat?", es: "Solo una. ¿Me puede dar un asiento de ventana?" },
      { speaker: "B", who: "Agente", en: "Sure. Here's your boarding pass. Gate 12.", es: "Claro. Aquí está su pase de abordar. Puerta 12." },
      { speaker: "A", who: "Tú", en: "Thank you. What time does boarding start?", es: "Gracias. ¿A qué hora empieza el abordaje?" },
      { speaker: "B", who: "Agente", en: "At ten thirty. Have a good flight!", es: "A las diez y media. ¡Buen vuelo!" },
    ],
  },
  {
    id: "doctor",
    title: "En el doctor",
    situation: "Le explicas al doctor cómo te sientes.",
    level: "Intermedio",
    lines: [
      { speaker: "B", who: "Doctor", en: "Hello, what seems to be the problem?", es: "Hola, ¿cuál parece ser el problema?" },
      { speaker: "A", who: "Tú", en: "I have a headache and I feel tired.", es: "Tengo dolor de cabeza y me siento cansado." },
      { speaker: "B", who: "Doctor", en: "How long have you felt like this?", es: "¿Desde hace cuánto te sientes así?" },
      { speaker: "A", who: "Tú", en: "Since yesterday morning.", es: "Desde ayer en la mañana." },
      { speaker: "B", who: "Doctor", en: "You should rest and drink plenty of water.", es: "Deberías descansar y tomar mucha agua." },
      { speaker: "A", who: "Tú", en: "Okay. Thank you, doctor.", es: "De acuerdo. Gracias, doctor." },
    ],
  },
  {
    id: "interview",
    title: "Entrevista de trabajo",
    situation: "Una entrevista de trabajo sencilla.",
    level: "Intermedio-Alto",
    lines: [
      { speaker: "B", who: "Entrevistador", en: "Tell me a little about yourself.", es: "Cuéntame un poco sobre ti." },
      { speaker: "A", who: "Tú", en: "I'm a marketing assistant with three years of experience.", es: "Soy asistente de marketing con tres años de experiencia." },
      { speaker: "B", who: "Entrevistador", en: "Why do you want to work here?", es: "¿Por qué quieres trabajar aquí?" },
      { speaker: "A", who: "Tú", en: "I admire your company and I want to grow with the team.", es: "Admiro su empresa y quiero crecer con el equipo." },
      { speaker: "B", who: "Entrevistador", en: "What is your biggest strength?", es: "¿Cuál es tu mayor fortaleza?" },
      { speaker: "A", who: "Tú", en: "I'm organized and I learn quickly.", es: "Soy organizado y aprendo rápido." },
      { speaker: "B", who: "Entrevistador", en: "Great. We'll be in touch soon.", es: "Genial. Estaremos en contacto pronto." },
    ],
  },
  {
    id: "plans",
    title: "Haciendo planes",
    situation: "Organizas una salida con un amigo.",
    level: "Básico",
    lines: [
      { speaker: "B", who: "Amigo", en: "Are you free this weekend?", es: "¿Estás libre este fin de semana?" },
      { speaker: "A", who: "Tú", en: "Yes, I am. What do you have in mind?", es: "Sí, lo estoy. ¿Qué tienes en mente?" },
      { speaker: "B", who: "Amigo", en: "We could watch a movie on Saturday.", es: "Podríamos ver una película el sábado." },
      { speaker: "A", who: "Tú", en: "Sounds good. What time?", es: "Suena bien. ¿A qué hora?" },
      { speaker: "B", who: "Amigo", en: "How about seven in the evening?", es: "¿Qué tal a las siete de la tarde?" },
      { speaker: "A", who: "Tú", en: "Perfect. See you then!", es: "Perfecto. ¡Nos vemos!" },
    ],
  },
  {
    id: "restaurant",
    title: "En el restaurante",
    situation: "Ordenas la comida en un restaurante.",
    level: "Básico",
    lines: [
      { speaker: "B", who: "Mesero", en: "Good evening. Are you ready to order?", es: "Buenas noches. ¿Están listos para ordenar?" },
      { speaker: "A", who: "Tú", en: "Yes, I'll have the grilled chicken, please.", es: "Sí, voy a querer el pollo a la parrilla, por favor." },
      { speaker: "B", who: "Mesero", en: "Would you like anything to drink?", es: "¿Desea algo de tomar?" },
      { speaker: "A", who: "Tú", en: "Just water, thanks. And a small salad.", es: "Solo agua, gracias. Y una ensalada pequeña." },
      { speaker: "B", who: "Mesero", en: "Of course. I'll bring it right away.", es: "Por supuesto. Se lo traigo enseguida." },
      { speaker: "A", who: "Tú", en: "Thank you. Could we get the bill later?", es: "Gracias. ¿Nos puede traer la cuenta después?" },
    ],
  },
  {
    id: "hotel",
    title: "En el hotel",
    situation: "Haces el check-in en la recepción del hotel.",
    level: "Intermedio",
    lines: [
      { speaker: "B", who: "Recepcionista", en: "Welcome! Do you have a reservation?", es: "¡Bienvenido! ¿Tiene una reservación?" },
      { speaker: "A", who: "Tú", en: "Yes, under the name García, for two nights.", es: "Sí, a nombre de García, por dos noches." },
      { speaker: "B", who: "Recepcionista", en: "Perfect. I have a room on the third floor.", es: "Perfecto. Tengo una habitación en el tercer piso." },
      { speaker: "A", who: "Tú", en: "Great. What time is breakfast?", es: "Genial. ¿A qué hora es el desayuno?" },
      { speaker: "B", who: "Recepcionista", en: "From seven to ten in the morning.", es: "De siete a diez de la mañana." },
      { speaker: "A", who: "Tú", en: "Thank you. Is there free Wi-Fi?", es: "Gracias. ¿Hay Wi-Fi gratis?" },
      { speaker: "B", who: "Recepcionista", en: "Yes, the password is on your key card.", es: "Sí, la contraseña está en su tarjeta-llave." },
    ],
  },
  {
    id: "pharmacy",
    title: "En la farmacia",
    situation: "Pides algo para el dolor de cabeza.",
    level: "Básico",
    lines: [
      { speaker: "A", who: "Tú", en: "Hi, do you have something for a headache?", es: "Hola, ¿tiene algo para el dolor de cabeza?" },
      { speaker: "B", who: "Farmacéutico", en: "Yes, these pills work well. Take one every eight hours.", es: "Sí, estas pastillas funcionan bien. Tome una cada ocho horas." },
      { speaker: "A", who: "Tú", en: "Do I need a prescription?", es: "¿Necesito receta?" },
      { speaker: "B", who: "Farmacéutico", en: "No, you don't. They're sold over the counter.", es: "No, no necesita. Se venden sin receta." },
      { speaker: "A", who: "Tú", en: "Okay, I'll take them. How much is it?", es: "De acuerdo, me las llevo. ¿Cuánto es?" },
      { speaker: "B", who: "Farmacéutico", en: "Six dollars. Feel better soon!", es: "Seis dólares. ¡Que se mejore pronto!" },
    ],
  },
  {
    id: "bank",
    title: "En el banco",
    situation: "Preguntas cómo abrir una cuenta.",
    level: "Intermedio",
    lines: [
      { speaker: "A", who: "Tú", en: "Good morning. I'd like to open a bank account.", es: "Buenos días. Quisiera abrir una cuenta bancaria." },
      { speaker: "B", who: "Cajero", en: "Sure. Do you have an ID and proof of address?", es: "Claro. ¿Tiene identificación y un comprobante de domicilio?" },
      { speaker: "A", who: "Tú", en: "Yes, here they are. Is there a monthly fee?", es: "Sí, aquí están. ¿Hay una cuota mensual?" },
      { speaker: "B", who: "Cajero", en: "No, this account is free if you use it regularly.", es: "No, esta cuenta es gratis si la usa con regularidad." },
      { speaker: "A", who: "Tú", en: "That sounds good. How long does it take?", es: "Eso suena bien. ¿Cuánto tarda?" },
      { speaker: "B", who: "Cajero", en: "About fifteen minutes. Please have a seat.", es: "Unos quince minutos. Por favor, tome asiento." },
    ],
  },
  {
    id: "neighbor",
    title: "Charlando con un vecino",
    situation: "Conversación breve y amable con un vecino.",
    level: "Básico",
    lines: [
      { speaker: "B", who: "Vecino", en: "Hi! You must be the new neighbor.", es: "¡Hola! Tú debes ser el nuevo vecino." },
      { speaker: "A", who: "Tú", en: "Yes, I moved in last week. I'm Ana.", es: "Sí, me mudé la semana pasada. Soy Ana." },
      { speaker: "B", who: "Vecino", en: "Welcome! How do you like the area so far?", es: "¡Bienvenida! ¿Qué te parece la zona hasta ahora?" },
      { speaker: "A", who: "Tú", en: "It's quiet and friendly. I really like it.", es: "Es tranquila y amigable. Me gusta mucho." },
      { speaker: "B", who: "Vecino", en: "If you need anything, just knock on my door.", es: "Si necesitas algo, solo toca mi puerta." },
      { speaker: "A", who: "Tú", en: "Thank you, that's very kind!", es: "Gracias, ¡qué amable!" },
    ],
  },
  {
    id: "phone-appointment",
    title: "Haciendo una cita por teléfono",
    situation: "Llamas para agendar una cita.",
    level: "Intermedio",
    lines: [
      { speaker: "B", who: "Recepción", en: "Good afternoon, Dental Clinic. How can I help you?", es: "Buenas tardes, Clínica Dental. ¿En qué puedo ayudarle?" },
      { speaker: "A", who: "Tú", en: "Hi, I'd like to make an appointment for a cleaning.", es: "Hola, quisiera agendar una cita para una limpieza." },
      { speaker: "B", who: "Recepción", en: "Sure. Are you available on Tuesday morning?", es: "Claro. ¿Está disponible el martes en la mañana?" },
      { speaker: "A", who: "Tú", en: "Tuesday works. Is ten o'clock okay?", es: "El martes me sirve. ¿Las diez está bien?" },
      { speaker: "B", who: "Recepción", en: "Ten o'clock is fine. May I have your name?", es: "Las diez está bien. ¿Me da su nombre?" },
      { speaker: "A", who: "Tú", en: "It's Luis Romero. Thank you very much.", es: "Es Luis Romero. Muchas gracias." },
    ],
  },
];
