import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  information: { label: string; description: string }[] = [
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
      description: '13 ปี 1 เดือน',
    },
    {
      label: 'สถานะ',
      description: 'เพื่อนยังไม่มีเลยครับ 55+',
    },
    {
      label: 'วันเกิด',
      description: '13 เมษายน พุทธศักราช 2553',
    },
    {
      label: 'ศึกษาอยู่ที่',
      description:
        'โรงเรียนบางปะอิน “ราชานุเคราะห์ ๑” ชั้นมัธยมศึกษาปีที่ 2 ห้องเรียนที่ 3 จากทั้งหมด 11 ห้องเรียน',
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
      label: 'สีที่ชอบ',
      description: 'สีเขียว, ขาว, ดำ',
    },
    {
      label: 'เป้าหมาย?',
      description:
        'แค่อยากจะติดท็อป 10 พร้อมเกรดเฉลี่ย 4 และ 100 คะแนนทุกวิชาครับ (หวังสูงชิบหาย55+)',
    },
  ];
}
