import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

/**
 * User registration service
 * 사용자 등록 관련 서비스
 */
export const userService = {
  /**
   * Save user data to Firestore
   * 사용자 데이터를 Firestore에 저장
   * 
   * @param {Object} user - Firebase Auth user object
   * @param {string} provider - Authentication provider (google, email, etc)
   */
  async saveUserData(user, provider) {
    try {
      // Get device and browser information
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        vendor: navigator.vendor
      };

      // Create user document data
      const userData = {
        uid: user.uid,
        email: user.email,
        provider: provider,
        createdAt: new Date(),  // Firestore will convert this to timestamp
        deviceInfo: deviceInfo,
        region: navigator.language.split('-')[1] || 'UNKNOWN'  // e.g., 'KR', 'US'
      };

      // Save to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData, { merge: true });
      
      console.log("User data saved successfully");
      return userData;
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }
}; 