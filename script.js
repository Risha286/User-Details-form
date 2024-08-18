document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
    })
    .then(response => response.text())
    .then(data => {
        console.log("Response from server:", data);
        if (data.includes('User details saved successfully')) {
            showPopup();
        }
    })
    .catch(error => console.error('Error:', error));
});

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    document.querySelector('.close').onclick = function() {
        popup.style.display = 'none';
    };
}
