function formatDate(dateString: string): string {
  // 2024-10-19T05:34:02 -> 2024년 10월 19일
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

function formatTime(dateString: string): string {
  // 2024-10-19T05:34:02 -> 10월 19일 5시 34분
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
}

export { formatDate, formatTime };
