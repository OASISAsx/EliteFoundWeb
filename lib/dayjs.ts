import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(buddhistEra);
dayjs.locale("th");

export default dayjs;
