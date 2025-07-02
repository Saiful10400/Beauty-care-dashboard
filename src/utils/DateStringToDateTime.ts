function dateStringToDateTime(dateString: string): string {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12; // Convert 0 to 12-hour format

  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();

  return `${month}/${day}/${year} at ${hours}:${minutesStr} ${ampm}`;
}



export default dateStringToDateTime