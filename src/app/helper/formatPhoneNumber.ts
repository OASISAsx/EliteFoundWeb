const formatPhoneNumber = (value: string) => {
  if (!value) return "";
  const numbers = value.replace(/\D/g, "");
  if (numbers.length > 6) {
    return numbers.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
  } else if (numbers.length > 3) {
    return numbers.replace(/(\d{3})(\d+)/, "$1-$2");
  }
  return numbers;
};

export { formatPhoneNumber };
