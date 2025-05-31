import auth from "../servicios/firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword 
} from "firebase/auth";

class FirebaseAuth {
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido al iniciar sesión.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico es inválido.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No se encontró un usuario con ese correo electrónico.";
          break;
        case 'auth/wrong-password':
          errorMessage = "La contraseña es incorrecta.";
          break;
        case 'auth/invalid-credential':
          errorMessage = "Las credenciales son inválidas. Verifica tu correo y contraseña.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Demasiados intentos fallidos. Intenta de nuevo más tarde.";
          break;
        case 'auth/api-key-not-valid':
            errorMessage = "Error de configuración: la clave API de Firebase no es válida. Revisa tu firebaseConfig.js";
            break;
        default:
          errorMessage = "Error al iniciar sesión: " + error.message;
          break;
      }
      throw new Error(errorMessage);
    }
  }

  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido al registrarse.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Este correo electrónico ya está registrado.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico es inválido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña es demasiado débil (mínimo 6 caracteres).";
          break;
        case 'auth/api-key-not-valid':
            errorMessage = "Error de configuración: la clave API de Firebase no es válida. Revisa tu firebaseConfig.js";
            break;
        default:
          errorMessage = "Error al registrarse: " + error.message;
          break;
      }
      throw new Error(errorMessage);
    }
  }

  async logout() {
    try {
      await signOut(auth);
      return "Sesión cerrada exitosamente.";
    } catch (error) {
      throw new Error("Error al cerrar sesión: " + error.message);
    }
  }
}

export default new FirebaseAuth();