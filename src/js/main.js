import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeTh from 'air-datepicker/locale/th';

new AirDatepicker('#datepicker', {
  locale: localeTh,
  autoClose: true,
  dateFormat: 'dd MMMM yyyy',
  onSelect({ date }) {
    if (date) {
      const buddhistYear = date.getFullYear() + 543;
      const fullDate = date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      console.log('📅 วันที่ที่เลือก (พ.ศ.):', fullDate);
    }
  }
});
