import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

/**
 * 时间格式简化
 * @param {Number} val 13位时间戳
 * @return {String} h:mm A
 */
export const timeSimplify = (val) => {
  if (!val) {
    return '--:--'
  }
  const time = dayjs(val)
  const diffHour = dayjs().startOf('day').diff(time, 'hour')
  let prefix = ''

  if (diffHour > 0 && diffHour <= 24) {
    prefix = '昨天'
  } else if (diffHour > 24) {
    prefix = time.format('MM-DD')
  }
  return prefix + ' ' + time.format('h:mm A')
}
