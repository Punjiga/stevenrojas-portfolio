document.addEventListener('DOMContentLoaded', function () {
    //------------------- PARA EL MENU DE HAMBURGUESA --------------------------
const menuToggle = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu');
const closeBtn = document.querySelector('.close-menu');
// Abrir/cerrar animación del ícono hamburguesa
function openMenu() {
    menuToggle.classList.add('open');
    menuList.classList.add('active');
}
function closeMenu() {
    menuToggle.classList.remove('open');
    menuList.classList.remove('active');
}
// Toggle al hacer clic en el ícono
menuToggle.addEventListener('click', function () {
    if (menuToggle.classList.contains('open')) {
    closeMenu();
    } else {
    openMenu();
    }
});
// Cerrar al hacer clic en la X
closeBtn.addEventListener('click', () => {
    closeMenu();
});
// Opcional: cerrar al hacer clic en cualquier enlace del menú
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
    closeMenu();
    });
});
    //------------------- FONDO ANIMADO TODA LA PAGINA --------------------------
    tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        fpsLimit: 30,
        particles: {
            number: { value: 40 },
            shape: { type: "circle" },
            size: { value: 20, random: true },
            color: { value: ["#d96523", "#68c46d", "#5c4033"] },
            opacity: { value: 0.2 },
            move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "bounce" }
            }
        },
        background: {
            color: { value: "#f2efe9" }
        }
    });
    //------------------- LETRAS P HEADER --------------------------
    const palabras = ["Web", "Foto", "Video"];
    const cambiador = document.getElementById("cambiador");
    let index = 0;
    setInterval(() => {
    // Simula que la palabra sube
    cambiador.style.transform = "translateY(-100%)";
    // Espera un poco y cambia la palabra
    setTimeout(() => {
        index = (index + 1) % palabras.length;
        cambiador.textContent = palabras[index];
        // Simula que baja con la nueva palabra
        cambiador.style.transform = "translateY(0%)";
    }, 500); // mismo tiempo que el CSS transition
    }, 2500);
    //------------------- FLECHA QUE LLEVA HACIA ARRIBA --------------------------
    const goUp = document.getElementById('goUp');
    // Mostrar flecha al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            goUp.classList.add('show');
        } else {
            goUp.classList.remove('show');
        }
    });
    // Scroll suave al hacer click
    goUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
        });
    });
    //------------------- CODIGO BARRA DESPLAZABLE PROYECTOS --------------------------
    const radios = document.querySelectorAll('.radio-container input[name="project"]');
    const glider = document.querySelector('.radio-container .glider');
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
            // Mueve la barra según posición
            glider.style.transform = `translateY(${index * 100}%)`;
            }
        });
    });
    //------------------- CODIGO PROYECTOS CAMBIAR IMG Y RUTA PROYECTOS -------------------------
    // Primero obtengo los elementos que voy a modificar
    const titulo = document.getElementById("projectTitle");
    const circle = document.querySelector(".circleProject");
    const btn = document.getElementById("visitBtn");
    // Escucho los cambios en los radios de proyecto
    document.querySelectorAll("input[name='project']").forEach(input => {
        input.addEventListener("change", () => {
            // Según el ID del radio, actualizo todo
            if (input.id === "proj1") {
            titulo.textContent = "Congreso de Café"; // cambio el nombre
            circle.style.backgroundImage = "url(../assets/imgs/project-1.png)"; // cambio la imagen
            circle.href = btn.href = "https://congreso-de-cafe.vercel.app/"; // actualizo los enlaces
            }
            if (input.id === "proj2") {
                titulo.textContent = "Fit Force";
                circle.style.backgroundImage = "url(../assets/imgs/project-2.png)";
                circle.href = btn.href = "https://fit-force-final.vercel.app/";
            }
            if (input.id === "proj3") {
                titulo.textContent = "Bonfire Lit";
                circle.style.backgroundImage = "url(../assets/imgs/project-3.png)";
                circle.href = btn.href = "https://bonfire-lit.vercel.app/";
            }
        });
    });
    // Al cargar, configuro manualmente el primer proyecto y que se pueda tener la ruta
    titulo.textContent = "Congreso de Café";
    circle.style.backgroundImage = "url('./assets/imgs/project-1.png')";
    circle.href = btn.href = "https://congreso-de-cafe.vercel.app/";
    //------------------- PARA PODER TENER EL FORM BIEN HECHO -------------------------
    // Inicializar EmailJS
    emailjs.init("_SC3QrHOmpfnC4f8J"); // tu Public Key
    const form = document.getElementById("mi-form");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const enviarBtn = form.querySelector("button[type='submit']");
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    // Función para validar todo el formulario
    function validarForm() {
        return (
            nombre.value.trim().length >= 2 &&
            validarEmail(email.value.trim()) &&
            mensaje.value.trim().length >= 10
        );
    }
    // Estado inicial del botón
    enviarBtn.disabled = true;
    enviarBtn.style.opacity = "0.5";
    enviarBtn.style.cursor = "not-allowed";
    // Escuchar cambios en todos los campos
    [nombre, email, mensaje].forEach(input => {
        input.addEventListener("input", () => {
            if (validarForm()) {
                enviarBtn.disabled = false;
                enviarBtn.style.opacity = "1";
                enviarBtn.style.cursor = "pointer";
            } else {
                enviarBtn.disabled = true;
                enviarBtn.style.opacity = "0.5";
                enviarBtn.style.cursor = "not-allowed";
            }
        });
    });
    // Manejo del submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validarForm()) {
            return Swal.fire({
                title: 'Formulario incompleto',
                html: 'Revisa que tu <b>nombre</b> tenga al menos 2 caracteres, tu <b>email</b> sea válido y el <b>mensaje</b> tenga al menos 10 caracteres.',
                icon: 'error',
                confirmButtonColor: 'var(--color-ctas)'
            });
        }
        // Enviar formulario con EmailJS
        emailjs.sendForm(
            "service_imnngtd",    // Service ID
            "template_gj5v8t2",   // Template ID
            form
        )
        .then(() => {
            Swal.fire({
                title: 'Mensaje enviado',
                html: 'Te responderé en <span style="color: var(--color-ctas)"><b>menos de 48 horas</b></span>.',
                icon: 'success',
                confirmButtonColor: 'var(--color-ctas)'
            });
            form.reset();
            // Reset del botón tras envío
            enviarBtn.disabled = true;
            enviarBtn.style.opacity = "0.5";
            enviarBtn.style.cursor = "not-allowed";
        })
        .catch(() => {
            Swal.fire({
                title: 'Error al enviar',
                text: 'Intenta nuevamente más tarde.',
                icon: 'error',
                confirmButtonColor: 'var(--color-ctas)'
            });
        });
    });
    //------------------- PARA EL VIDEO DE LA SECTION VIDEOS -------------------------
    function loadVideo(container) {
        container.innerHTML = `
            <iframe src="https://www.youtube.com/embed/jOeX9W99U9s?autoplay=1"
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
                    style="width:100%; height:500px; border-radius:20px 0 0 20px;">
            </iframe>`;
    }
    window.loadVideo = loadVideo;
    //------------------- PARA LA SECTION DE HABILIDADES -------------------------
    // llenar el carrusel
    const carousel = document.querySelector('.skills-carousel');
    const totalSkills = 12;
    for (let contador = 1; contador <= totalSkills; contador++) {
        const item = document.createElement('div');
        item.className = 'skill-item';
        item.innerHTML = `<img src="./assets/imgs/habilidad-${contador}.png" alt="Habilidad ${contador}">`;
        carousel.append(item);
    }
    // Efecto “lift” ida y vuelta
    const items = carousel.querySelectorAll('.skill-item');
    let current = 0;
    let dir = 1;           // +1 va hacia adelante, -1 hacia atrás
    items[current].classList.add('lift');
    setInterval(() => {
    // quito lift del actual
        items[current].classList.remove('lift');
    // cambio de dirección en los extremos
        if (current === items.length - 1) dir = -1;
        else if (current === 0) dir = 1;
    // avanzo o retrocedo
        current += dir;
        items[current].classList.add('lift');
    }, 900);
    //------------------- fin -------------------------
});
