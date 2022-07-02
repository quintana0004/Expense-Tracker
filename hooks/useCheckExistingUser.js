import { useEffect, useState } from "react";
import { fetchExistingUser } from "../util/http-two";
import { useUser } from "../store/expense-zustand";
import { CONSTANTS, JSHash } from "react-native-hash";

function useCheckExistingUser() {
  // --- Zustand Function  ---
  const setUser = useUser((state) => state.setUser);

  // --- User Verification ---
  const [passwordUser, setPasswordUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [isValid, setIsValid] = useState({ valid: false, message: "" });
  const [isCheckedUser, setisCheckedUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function checkUser() {
      setisCheckedUser(true);
      // --- Check User ---
      try {
        const hashedPassword = await JSHash(
          passwordUser,
          CONSTANTS.HashAlgorithms.sha256
        );

        const user = await fetchExistingUser(emailUser, hashedPassword);
        if (user === "No-key") {
          setIsValid({
            valid: false,
            message:
              "This email and password don't exists. Please proceed to create account.",
          });
        } else {
          setIsValid({
            valid: true,
            message: "",
          });
          setUser(user.email, user.password, user.userID);
          console.log("----User ID:----", user.userID);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }

      setisCheckedUser(false);
    }

    if (passwordUser && emailUser) {
      checkUser();
    }
  }, [emailUser, passwordUser]);

  return {
    setEmailUser,
    setPasswordUser,
    isCheckedUser,
    isValid,
    errorMessage,
  };
}

export default useCheckExistingUser;
