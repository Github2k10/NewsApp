const changeDate = (date) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return `${months[month - 1]} ${day}, ${year}`;
};

export default changeDate;