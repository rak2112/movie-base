let toFromDates = () =>{
  let d = new Date();
  let dd = d.getDate();
  let mm = d.getMonth()+ 1;
  let yy = d.getFullYear();
  let fromDate = yy + '-' + mm + '-' + dd;
  let lastDay = dd-1;
  lastDay = (lastDay) ? lastDay : lastDay+1;
  let toDate = yy + '-' + (mm-1) + '-' + lastDay;
  return {fromDate, toDate};
};
export default toFromDates;
