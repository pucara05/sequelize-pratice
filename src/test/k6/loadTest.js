import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
        { duration: '30s', target: 50 }, // Fase de arranque: 50 usuarios durante 30 segundos
        { duration: '1m', target: 100 }, // Aumenta la carga a 100 usuarios en 1 minuto
        { duration: '30s', target: 0 },  // Fase de enfriamiento: reduce la carga a 0 usuarios
    ],
};

export default function () {
    const url = 'http://app:3000/api/users'; // URL de la API

    // Realiza una solicitud GET
    const res = http.get(url);
    
    // Agrega logs para depuración
    console.log(`Request to: ${url}`);
    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`); // Esto puede ser útil, pero ten cuidado con la cantidad de datos que imprimes.

    // Verifica el código de estado y que la respuesta no sea vacía
    const isStatus200 = check(res, { 
        'status es 200': (r) => r.status === 200 
    });

    // Solo sigue verificando si el estado es 200
    if (isStatus200) {
        const isJsonValid = check(res, {
            'respuesta es un JSON válido': (r) => {
                try {
                    const data = r.json(); // Parsea la respuesta JSON
                    return Array.isArray(data); // Verifica que sea un array
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return false; // Si no se puede parsear, devuelve false
                }
            },
        });

        // Si el JSON es válido, verifica que no esté vacío
        if (isJsonValid) {
            check(res, {
                'respuesta no está vacía': (r) => {
                    const data = r.json(); // Parsea la respuesta JSON
                    return Array.isArray(data) && data.length > 0; // Verifica que sea un array no vacío
                },
            });
        }
    }

    sleep(1); // Asegúrate de que haya un retraso entre las iteraciones
}

    /**  prueba para post crear usuarios a la base de datos
    const payload = JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: email,
    });

    let res = http.post(url, payload, {
        headers: { 'Content-Type': 'application/json' }
    });

    // Verifica solo el código de estado
    check(res, {
        'status es 201': (r) => r.status === 201,
    });

     sleep(1);  // Asegúrate de que haya un retraso entre las iteraciones
}
**/