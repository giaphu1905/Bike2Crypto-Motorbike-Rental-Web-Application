document.addEventListener('DOMContentLoaded', function() {
    var diaDiemSelect = document.getElementById('id_dia_diem');
    var xeSelect = document.getElementById('id_xe');
    if (diaDiemSelect && xeSelect) {
        diaDiemSelect.addEventListener('change', function() {
            var diaDiemId = this.value;
            fetch('/rent/api/xe_may/?dia_diem_id=' + diaDiemId)
                .then(response => response.json())
                .then(data => {
                    xeSelect.innerHTML = '';
                    data.forEach(function(xe) {
                        var option = document.createElement('option');
                        option.value = xe.id;
                        option.text = xe.ten;
                        xeSelect.add(option);
                    });
                });
        });
    }
});