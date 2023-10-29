export const formatDate = (dateString: string): string => {
  // Convertir la fecha a un objeto Date
  const date = new Date(dateString);

  // Obtener el día, el mes y el año
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Concatenar la fecha en el formato "dd/mm/aaaa"
  return `${day}/${month}/${year}`;
};
