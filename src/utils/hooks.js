import { useCallback, useState } from "react";
import { REGEX } from "./initialCards";

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const [isVisibleSpanError, setVisibleSpanError] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setVisibleSpanError(event.target);

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });

    // решает проблему стандартной валидации, добавляет условие .ru на конце к браузерной валидации поля email
    if (event.target.name === "email") {
      setIsValid(
        target.closest("form").checkValidity() && REGEX.test(event.target.value)
      );
      //console.log(REGEX.test(event.target.value));
      if(target.closest("form").checkValidity() && !REGEX.test(event.target.value)) {
        setErrors({ ...errors, [name]: "Введите часть адреса после символа «@»." });
      } if(target.closest("form").checkValidity() && REGEX.test(event.target.value)) {
        setErrors({ ...errors, [name]: "" });
      }
    } else {
      setIsValid(target.closest("form").checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setVisibleSpanError("");
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    isVisibleSpanError,
  };
}
