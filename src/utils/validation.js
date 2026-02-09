const vaildateUserUpdateForm = (formData, setFormError) => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Please enter a valid email";
  }

  if (!formData.contactNumber.trim()) {
    newErrors.contactNumber = "Phone number is required";
  }

  if (!formData.interest) {
    newErrors.interest = "Interest is required";
  } else if (formData.interest < 0 || formData.interest > 100) {
    newErrors.interest = "Interest must be between 0 and 100";
  }
  if (!formData.loanLimit) {
    newErrors.loanLimit = "Loan limit is required";
  } else if (formData.loanLimit < 0) {
    newErrors.loanLimit = "Loan limit must be greater than 0";
  }

  setFormError(newErrors);
  return Object.keys(newErrors).length === 0;
};

const vaildateUserResetPasswordForm = (formData, setFormError) => {
  const newErrors = {};

  if (!formData.newPassword.trim()) {
    newErrors.newPassword = "New password is required";
  }
  if (!formData.confirmPassword.trim()) {
    newErrors.newPassword = "New password is required";
  }

  if (formData.newPassword !== formData.confirmPassword) {
    newErrors.confirmPassword =
      "New password and confirm password do not match";
  }

  setFormError(newErrors);
  return Object.keys(newErrors).length === 0;
};

const vaildateFaqForm = (formData, setFormError,type) => {
  const newErrors = {};

  if (type === "edit") {
    if (!formData.order.trim()) {
      newErrors.order = "Order is required";
    }
  }

  if (!formData.question.trim()) {
    newErrors.question = "Question is required";
  }
  if (!formData.answer.trim()) {
    newErrors.answer = "Answer is required";
  }

  setFormError(newErrors);
  return Object.keys(newErrors).length === 0;
};

export { vaildateUserUpdateForm, vaildateUserResetPasswordForm, vaildateFaqForm  };
