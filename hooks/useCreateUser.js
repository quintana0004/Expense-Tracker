import { useEffect, useState } from "react";
import { storeNewUser, checkIfExistingEmail } from "../util/http-two";
import { CONSTANTS, JSHash } from "react-native-hash";
import { useUser } from "../store/expense-zustand";

function useCreateUser() {
  // --- Zustand ---
  const addUser = useUser((state) => state.addUser);

  // --- User verification ---
  const [isCreatingUser, setIsCreatingUser] = useState(true);
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [confirmedPassword, setUserConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState({
    valid: false,
    message: "",
  });

  useEffect(() => {
    async function createUser() {
      setIsCreatingUser(true);

      const isEmailTaken = await checkIfExistingEmail(email);

      console.log("Is Email Taken: ", isEmailTaken);

      if (!isEmailTaken) {
        setIsValidEmail({
          valid: false,
          message: "This email is already taken.",
        });

        console.log("Is Valid Email Set: ", isValidEmail);
      } else {
        setIsValidEmail({
          valid: true,
          message: "",
        });
      }

      if (isEmailTaken) {
        try {
          const hashedPassword = await JSHash(
            password,
            CONSTANTS.HashAlgorithms.sha256
          );

          const userId = await storeNewUser(email, hashedPassword);
          addUser(email, hashedPassword, userId);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }

      setIsCreatingUser(false);
    }

    if (email && password && confirmedPassword) {
      createUser();
    }
  }, [email, password]);

  return {
    isValidEmail,
    errorMessage,
    setUserEmail,
    setUserPassword,
    setUserConfirmedPassword,
    isCreatingUser,
  };
}

export default useCreateUser;
