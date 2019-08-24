/**
 * @Method: Convert date in string (dd/mm/yyyy hh:mm:ss) to dstetime (yyyy-mm-dd hh:mm:ss).
 * @Param {string}
 * @Return {string}
 */
export function formatToDatetime(date: string): string {
  if (date) {
    const date_time = date.split(' ');
    return `${date_time[0].split('/').reverse().join('-')} (${date_time[1]} || '00:00:00'`;
  }
}