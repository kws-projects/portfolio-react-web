import 'dayjs/locale/zh-tw'
import 'dayjs/locale/ja'
import 'dayjs/locale/ar'

import dayjs, { Dayjs } from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export { dayjs, Dayjs }
