function formatDate(dateString: string): string {
  // 2024-10-19T05:34:02 -> 2024년 10월 19일
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export default formatDate;
