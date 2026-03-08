// Función para scroll suave a la sección de reservas
function scrollToReservas() {
    const reservasSection = document.getElementById('reservas');
    reservasSection.scrollIntoView({ behavior: 'smooth' });
}

// Manejo del formulario de reservas
document.getElementById('reservaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const cantidad = document.getElementById('cantidad').value;
    const asientos = document.getElementById('asientos').value;
    
    // Validar datos
    if (!nombre || !email || !telefono || !fecha || !cantidad || !asientos) {
        mostrarMensaje('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    // Crear objeto con la reserva
    const reserva = {
        nombre,
        email,
        telefono,
        fecha,
        cantidad,
        asientos,
        timestamp: new Date().toISOString()
    };
    
    // Guardar en localStorage
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    // Mostrar mensaje de éxito
    mostrarMensaje('¡Reserva confirmada exitosamente! Pronto recibirás una confirmación por email.', 'success');
    
    // Limpiar formulario
    document.getElementById('reservaForm').reset();
    
    // Opcional: Enviar a un servidor
    enviarReservaAlServidor(reserva);
});

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    const elemento = document.getElementById('mensaje');
    elemento.textContent = texto;
    elemento.className = `mensaje ${tipo}`;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        elemento.className = 'mensaje';
    }, 5000);
}

// Función para enviar la reserva al servidor (opcional)
function enviarReservaAlServidor(reserva) {
    // Aquí puedes añadir código para enviar la reserva a tu servidor
    // Ejemplo con fetch:
    /*
    fetch('/api/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .then(data => console.log('Éxito:', data))
    .catch((error) => console.error('Error:', error));
    */
    
    console.log('Reserva registrada:', reserva);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de Reservas cargada');
    
    // Cargar reservas desde localStorage al cargar la página
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    console.log(`Se encontraron ${reservasGuardadas.length} reservas guardadas`);
});