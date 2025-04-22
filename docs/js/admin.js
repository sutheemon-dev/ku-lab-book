//------------------------select dropdown--------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');

    dropdownMenus.forEach(menu => {
        const targetSelector = menu.getAttribute('data-target');
        const targetInput = document.querySelector(targetSelector);

        if (!targetInput) return;

        // รองรับคลิกที่ <a> หรือ <button> ที่มี data-value
        const selectableItems = menu.querySelectorAll('[data-value]');
        selectableItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const value = this.getAttribute('data-value');
                targetInput.value = value;
            });
        });

        // รองรับ <input type="time"> ใน dropdown
        const timeInputs = menu.querySelectorAll('input[type="time"]');
        timeInputs.forEach(timeInput => {
            timeInput.addEventListener('change', function () {
                targetInput.value = this.value;
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      const targetSelector = menu.getAttribute('data-target');
      const btn = document.querySelector(targetSelector);
      if (!btn) return;
  
      menu.querySelectorAll('[data-value]').forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          // เอา data-value มาใส่เป็นข้อความปุ่มหลัก
          btn.textContent = this.getAttribute('data-value');
        });
      });
    });
  });
//------------------------------end--------------------------------------------//
// clear text--------------------------------------------------------------------//
function clearForm() {
    document.getElementById('searchForm').reset(); // ล้างข้อมูลในฟอร์มทั้งหมด
}
// end--------------------------------------------------------------------------------///

document.addEventListener('DOMContentLoaded', () => {
    // รายการ id ที่จะจัดการ
    const inputIds = [
        'startDate',
        'endDate',
        'input-search-2',
        'input-type-1',
        'input-type-2',
        'input-type-3',
        'input-type-4',
        'input-type-5',
        'input-type-6',
    ];
    // ฟังก์ชันลบค่า input ตาม id ที่เลือก
    function clearInput(selectedId) {
        const input = document.getElementById(selectedId);
        if (input) input.value = '';
    }

    // ผูกกับปุ่ม Clear (ลบทั้งหมด)
    document.getElementById('clearBtn').addEventListener('click', () => {
        inputIds.forEach(id => clearInput(id));
    });
});
// calendar 
import AirDatepicker from 'air-datepicker';

new AirDatepicker('#thai-datepicker', {
  autoClose: true,
  locale: {
    days: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'],
    daysShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    months: [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ],
    today: 'วันนี้',
    clear: 'ล้าง',
    dateFormat: 'dd/MM/yyyy',
    firstDay: 0
  },
  onSelect({date}) {
    if (date) {
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = (date.getFullYear() + 543).toString();
      document.querySelector('#thai-datepicker').value = `${d}/${m}/${y}`;
    }
  },
  buttons: ['clear', {
    content: 'วันนี้',
    onClick(dp) {
      dp.selectDate(new Date());
    }
  }]
});
