import { DateTime, Duration } from 'luxon';

const targetDate = DateTime.fromISO('2010-04-10T00:00:00.000', {
  zone: 'Asia/Bangkok',
});

const currentDate = DateTime.now().setZone('Asia/Bangkok');
const age = currentDate.diff(targetDate);

const totalDays = age.as('days');
const years = Math.floor(totalDays / 365);
const remainingDays = totalDays - years * 365;
const months = Math.floor(remainingDays / 30);
const days = remainingDays - months * 30;
const totalHours = age.as('hours');
const totalMinutes = age.as('minutes');
const totalSeconds = age.as('seconds');
const hours = totalHours % 24;
const minutes = totalMinutes % 60;
const seconds = totalSeconds % 60;

export default [
  {
    label: 'ชื่อจริง',
    description: 'จิรายุ ศรีสวัสดิ์',
  },
  {
    label: 'ชื่อเล่น',
    description: 'ซูกัส',
  },
  {
    label: 'อายุ',
    description: `${parseInt(years as unknown as string)} ปี, ${parseInt(
      months as unknown as string,
    )} เดือน, ${parseInt(days as unknown as string)} วัน, ${parseInt(
      hours as unknown as string,
    )} ชั่วโมง, ${parseInt(minutes as unknown as string)} นาที, ${parseInt(
      seconds as unknown as string,
    )} วินาที`,
  },
  {
    label: 'วันเกิด',
    description: '13 เมษายน พุทธศักราช 2553',
  },
  {
    label: 'การศึกษา',
    description:
      'มัธยมศึกษาตอนต้น โรงเรียน บางปะอิน “ราชานุเคราะห์ ๑” ชั้นมัธยมศึกษาปีที่ 2 ห้องเรียนที่ 3',
  },
  {
    label: 'อาศัยอยู่ที่',
    description: 'พระนครศรีอยุธยา ประเทศไทย',
  },
  {
    label: 'อาหารที่ชอบ',
    description: 'ผัดกระเพราไข่ดาว',
  },
  {
    label: 'ผลไม้ที่ชอบ',
    description: 'มะม่วง',
  },
  {
    label: 'ขนมหวานที่ชอบ',
    description: 'โดนัท',
  },
  {
    label: 'สิ่งที่ชอบ',
    description: 'Technology',
  },
];
