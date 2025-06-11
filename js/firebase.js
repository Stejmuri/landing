// Importar funciones de Firebase v11.9.1 desde CDN

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Objeto de configuración desde variables de entorno (.env)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

// ✅ Función para guardar un voto
export const saveVote = async (productID) => {
  try {
    // Referencia a la colección "votes"
    const votesRef = ref(database, "votes");

    // Crear una nueva referencia única para el usuario (como ID)
    const newVoteRef = push(votesRef);

    // Guardar el voto con el ID del producto y la fecha actual
    await set(newVoteRef, {
      productID: productID,
      date: new Date().toISOString()
    });

    return { success: true, message: "Voto guardado correctamente." };
  } catch (error) {
    return { success: false, message: "Error al guardar el voto: " + error.message };
  }
};