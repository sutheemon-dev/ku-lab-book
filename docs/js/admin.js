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
        'datepicker-2',
        'datepicker-3',
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
// ----------------------------------------calendar----------------------------
// ----------------------------------------calendar----------------------------

// ฟังก์ชันอัปเดต header ปี ค.ศ. → พ.ศ.
function updateYearHook(selectedDates, dateStr, instance) {
  // แปลงปีในส่วน header
  const beYear = instance.currentYear + 543;
  if (instance.currentYearElement) {
    instance.currentYearElement.value = beYear;
  }
  // แปลงปีใน select dropdown ปี (ถ้ามี)
  if (instance.yearElements) {
    instance.yearElements.forEach(el => {
      if (el.tagName === "SELECT") {
        Array.from(el.options).forEach(opt => {
          opt.text = String(Number(opt.value) + 543);
        });
      }
    });
  }
}

// ฟังก์ชันสร้างปุ่ม Clear | Today & ป้องกันสร้างซ้ำ
function injectButtons(instance) {
  const cal = instance.calendarContainer;
  if (!cal || cal._buttonsInjected) return;   // เช็คก่อนว่า container มีจริงหรือยัง
  const wrap = document.createElement("div");
  wrap.classList.add("fp-button-wrap");

  const makeBtn = (txt, fn) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = txt;
    b.classList.add("fp-button");
    b.addEventListener("click", () => {
      fn();
      updateYearHook(null, null, instance);
    });
    return b;
  };

  const sep = document.createElement("div");
  sep.classList.add("fp-separator");

  wrap.append(
    makeBtn("Clear", () => instance.clear()),
    sep,
    makeBtn("Today", () => instance.setDate(new Date()))
  );
  cal.appendChild(wrap);
  cal._buttonsInjected = true;
}

// เรียก flatpickr ให้ทุก <input class="datepicker">
document.querySelectorAll(".datepicker").forEach(input => {
  flatpickr(input, {
    locale: "th",
    dateFormat: "d/m/Y",
    defaultDate: new Date(),
    allowInput: false,
    clickOpens: true,
    disableMobile: true,


    // แปลงปีใน cell & altInput
    formatDate(date, fmt) {
      const s = flatpickr.formatDate(date, fmt, this.l10n);
      return s.replace(/(\d{4})$/, (_, y) => String(+y + 543));
    },
    // แปลงก่อน parse เวลารับค่า input กลับเข้า Date
    parseDate(dateStr) {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y - 543, m - 1, d);
    },

    // onReady: เรียกแค่ update header ปี
    onReady: updateYearHook,

    // onOpen: สร้างคลาสย่อขนาด + inject ปุ่ม + update ปี
    onOpen(selectedDates, dateStr, instance) {
      if (instance.calendarContainer) {
        instance.calendarContainer.classList.add("datepicker-yy");
      }
      updateYearHook(selectedDates, dateStr, instance);
      injectButtons(instance);
    },

    onMonthChange: updateYearHook,
    onYearChange:  updateYearHook,
    onClose:       updateYearHook
  });
});
// ----------------------------------------calendar end----------------------------
//------------------------------------------- status 
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  // ถ้าเป็นตัวที่ไม่ต้องการ ให้ข้ามเลย
  if (menu.dataset.target === '#input-type-6') return;

  const toggle = document.querySelector(menu.dataset.target);
  const defaultBtn = menu.querySelector('#btn-status-1');
  if (defaultBtn) {
    toggle.textContent = defaultBtn.dataset.value;
    toggle.style.backgroundColor = getComputedStyle(defaultBtn).backgroundColor;
  }

  menu.addEventListener('click', e => {
    const btn = e.target.closest('.btn-status');
    if (!btn) return;
    toggle.textContent = btn.dataset.value;
    toggle.style.backgroundColor = getComputedStyle(btn).backgroundColor;
  });
});

//--------------------------- end -----------------------------------------------------
  