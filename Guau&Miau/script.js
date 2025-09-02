// Validaciones de Registro
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const addPetBtn = document.getElementById("addPet");
    const petsContainer = document.getElementById("contenedorMascotas");

    // Función para poder añadir más mascotas
    if (addPetBtn) {
        addPetBtn.addEventListener("click", () => {
            const petDiv = document.createElement("div");
            petDiv.classList.add("pet");
            petsContainer.appendChild(petDiv);
        });
    }

    // Función para registrar un nuevo usuario
    if (registerForm) {
        registerForm.addEventListener("submit", e => {
            e.preventDefault();

            let fullName = document.getElementById("fullName").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let phone = document.getElementById("phone").value.trim();

            let isValid = true;

            // Validación nombre
            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{1,50}$/.test(fullName)) {
                document.getElementById("fullNameError").textContent = 
                    "El nombre debe contener solo letras y espacios (máximo 50 caracteres).";
                isValid = false;
            } else {
                document.getElementById("fullNameError").textContent = "";
            }

            // Validación email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById("emailError").textContent = 
                    "El correo ingresado no es válido.";
                isValid = false;
            } else {
                document.getElementById("emailError").textContent = "";
            }

            // Validación password
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@#$%]).{8,}$/.test(password)) {
                document.getElementById("passwordError").textContent = 
                    "La contraseña ingresada debe contener 8 caracteres o más, incluyendo mayúsculas, minúsculas, número y caracteres especiales.";
                isValid = false;
            } else {
                document.getElementById("passwordError").textContent = "";
            }

            // Confirmación password
            if (password !== confirmPassword) {
                document.getElementById("confirmPasswordError").textContent = 
                    "Las contraseñas ingresadas no coinciden.";
                isValid = false;
            } else {
                document.getElementById("confirmPasswordError").textContent = "";
            }

            // Validación celular
            if (phone && !/^\d{9}$/.test(phone)) {
                document.getElementById("phoneError").textContent = 
                    "Número celular inválido, debe contener 9 dígitos.";
                isValid = false;
            } else {
                document.getElementById("phoneError").textContent = "";
            }

            // Guardar usuario
            if (isValid) {
                let users = JSON.parse(localStorage.getItem("users")) || [];

                if (users.some(u => u.email === email)) {
                    alert("Este correo ya está registrado.");
                    return;
                }

                let user = { fullName, email, password, phone };
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));

                alert("Registro exitoso 🎉");
                window.location.href = "login.html";
            }
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();

            let email = document.getElementById("loginEmail").value.trim();
            let password = document.getElementById("loginPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert("Bienvenido " + user.fullName);
                window.location.href = "index.html";
            } else {
                alert("Correo o Contraseña incorrectos.");
            }
        });
    }
});
