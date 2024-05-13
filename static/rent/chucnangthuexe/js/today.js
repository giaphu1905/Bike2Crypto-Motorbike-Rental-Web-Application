document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('today').min = today;
    document.getElementById('today').addEventListener('change', (event) => {
        document.getElementById('return-day').min = event.target.value;
    });
});

