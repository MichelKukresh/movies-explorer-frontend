import { useCallback, useState } from "react";

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
    setIsValid(target.closest("form").checkValidity());
    //console.log(errors);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setVisibleSpanError("");
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, isVisibleSpanError};
}
