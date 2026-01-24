export const formatDateTH = (dateString: string | Date) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatDateENYearTH = (dateString: string | Date) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleDateString("th-TH", { month: "long" });
  const year = date.getFullYear(); // 👈 ค.ศ.

  return `${day} ${month} ${year}`;
};
