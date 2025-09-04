// Validaciones de Registro
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const addPetBtn = document.getElementById("addPet");
    const petTypeInput = document.getElementById("petType");
    const petNameInput = document.getElementById("petName");
    const petList = document.getElementById("petList");

    // Función para poder añadir más mascotas
    if (addPetBtn) {
        addPetBtn.addEventListener("click", () => {
            const type = petTypeInput.value; 
            const name = petNameInput.value.trim();

            if (!type || !name) {
                alert("Debes ingresar tipo y nombre de mascota.");
                return;
            }

            // Crear elemento de lista
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.marginTop = "5px";

            // Botón de eliminar
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.border = "none";
            deleteBtn.style.background = "transparent";
            deleteBtn.style.fontSize = "16px";
            deleteBtn.style.color = "red";

            deleteBtn.addEventListener("click", () => {
                petList.removeChild(li);
            });

            // Texto mascota
            const text = document.createElement("span");
            text.textContent = `${type} - ${name}`;

            li.appendChild(text);
            li.appendChild(deleteBtn);
            petList.appendChild(li);

            // Limpiar inputs
            petTypeInput.value = "";
            petNameInput.value = "";
        });
    }

    // Función para registrar un nuevo usuario
    if (registerForm) {
        registerForm.addEventListener("submit", e => {
            e.preventDefault();

            let fullName = document.getElementById("fullName").value.trim();
            let email = document.getElementById("email").value.trim();
            let confirmEmail = document.getElementById("confirmEmail").value.trim();
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let phone = document.getElementById("phone").value.trim();

            let isValid = true;

            // Validaciones
            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{1,50}$/.test(fullName)) {
                document.getElementById("fullNameError").textContent =
                    "El nombre debe contener solo letras y espacios (máximo 50 caracteres).";
                isValid = false;
            } else document.getElementById("fullNameError").textContent = "";

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById("emailError").textContent =
                    "El correo ingresado no es válido.";
                isValid = false;
            } else document.getElementById("emailError").textContent = "";

            if (email !== confirmEmail) {
                document.getElementById("confirmEmailError").textContent =
                    "Los correos ingresados no coinciden.";
                isValid = false;
            } else document.getElementById("confirmEmailError").textContent = "";

            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@#$%]).{8,}$/.test(password)) {
                document.getElementById("passwordError").textContent =
                    "La contraseña ingresada debe contener 8 caracteres o más, incluyendo mayúsculas, minúsculas, número y caracteres especiales.";
                isValid = false;
            } else document.getElementById("passwordError").textContent = "";

            if (password !== confirmPassword) {
                document.getElementById("confirmPasswordError").textContent =
                    "Las contraseñas ingresadas no coinciden.";
                isValid = false;
            } else document.getElementById("confirmPasswordError").textContent = "";

            if (phone && !/^\d{9}$/.test(phone)) {
                document.getElementById("phoneError").textContent =
                    "Número celular inválido, debe contener 9 dígitos.";
                isValid = false;
            } else document.getElementById("phoneError").textContent = "";

            if (isValid) {
                let users = JSON.parse(localStorage.getItem("users")) || [];

                if (users.some(u => u.email === email)) {
                    alert("Este correo ya está registrado.");
                    return;
                }

                // Guardar mascotas
                const pets = [];
                petList.querySelectorAll("li").forEach(li => {
                    const [type, name] = li.textContent.replace("❌", "").split(" - ");
                    pets.push({ type: type.trim(), name: name.trim() });
                });

                let user = { fullName, email, password, phone, pets };
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));

                // Mostrar popup
                const popup = document.getElementById("successPopup");
                popup.style.display = "block";

                setTimeout(() => {
                    popup.style.display = "none";
                    window.location.href = "home.html";
                }, 3000);
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
                // Mostrar mascotas
                let petsText = "No tiene mascotas registradas";
                if (user.pets && user.pets.length > 0) {
                    petsText = user.pets.map(p => `${p.type} - ${p.name}`).join(", ");
                }

                alert("Bienvenido " + user.fullName);
                alert("Sus mascotas son: " + petsText);

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1000);

            } else {
                alert("Correo o Contraseña incorrectos.");
            }
        });
    }
});
