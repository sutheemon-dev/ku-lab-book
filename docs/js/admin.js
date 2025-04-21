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
