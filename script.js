let form = document.querySelector("form");
let inputs = document.querySelectorAll("input[type='text']");
let cardsContainer = document.querySelector("#cards-container");
let inp = document.querySelector("#inp");
let fileInput = document.querySelector("#fileInput");
let selectedImageSrc = null;

// File upload functionality
inp.addEventListener("click", function() {
    fileInput.click();
});

fileInput.addEventListener("change", function(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        
        // Check if it's actually an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file!');
            return;
        }
        
        // Update the upload area text
        inp.textContent = file.name;
        
        // Create a FileReader to convert the file to a data URL
        const reader = new FileReader();
        reader.onload = function(event) {
            selectedImageSrc = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        inp.textContent = "Upload Profile Picture";
        selectedImageSrc = null;
    }
});

// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Check if all text fields are filled
    let allFieldsFilled = true;
    let emptyField = null;
    
    inputs.forEach((input, index) => {
        if (input.value.trim() === "") {
            allFieldsFilled = false;
            if (!emptyField) emptyField = input;
        }
    });

    if (!allFieldsFilled) {
        alert("Please fill all fields!");
        emptyField.focus();
        return;
    }

    // Create card elements
    let card = document.createElement("div");
    card.classList.add("card");

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "×";
    deleteBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this card?")) {
            card.remove();
        }
    });

    // Create profile section
    let profile = document.createElement("div");
    profile.classList.add("profile");

    let img = document.createElement("img");
    // Use selected image or default placeholder
    if (selectedImageSrc) {
        img.setAttribute("src", selectedImageSrc);
    } else {
        // Default placeholder with a nice gradient
        img.setAttribute("src", "data:image/svg+xml;charset=UTF-8,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E");
    }
    img.alt = "Profile Picture";

    // Create text elements
    let h3 = document.createElement("h3");
    h3.textContent = inputs[0].value;

    let h5 = document.createElement("h5");
    h5.textContent = inputs[1].value;

    let p = document.createElement("p");
    p.textContent = inputs[2].value;

    // Build the card structure
    profile.appendChild(img);
    card.appendChild(deleteBtn);
    card.appendChild(profile);
    card.appendChild(h3);
    card.appendChild(h5);
    card.appendChild(p);

    // Add card to the cards container
    cardsContainer.appendChild(card);

    // Reset form
    form.reset();
    inp.textContent = "Upload Profile Picture";
    selectedImageSrc = null;
    
    // Show success message
    showSuccessMessage();
});

// Success message function
function showSuccessMessage() {
    const successMsg = document.createElement("div");
    successMsg.textContent = "Card created successfully! 🎉";
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = "slideOutRight 0.5s ease-out";
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 500);
    }, 3000);
}

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(300px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);