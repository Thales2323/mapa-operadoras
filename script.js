const operatorCoordinates = {
    'VERO': [
        [-23.5505, -46.6333],
        [-23.5510, -46.6340],
        [-23.5505, -46.6345],
        [-23.5500, -46.6340]
    ],
    'CLARO': [
        [-23.5617, -46.6252],
        [-23.5622, -46.6259],
        [-23.5617, -46.6264],
        [-23.5612, -46.6259]
    ],
    'IBI': [
        [-23.5358, -46.6377],
        [-23.5363, -46.6384],
        [-23.5358, -46.6389],
        [-23.5353, -46.6384]
    ],
    'SUPER I': [
        [-23.5461, -46.6470],
        [-23.5466, -46.6477],
        [-23.5461, -46.6482],
        [-23.5456, -46.6477]
    ],
    // Adicione as coordenadas para as outras operadoras aqui
};

const map = L.map("map").setView([-19.909731888689432, -43.938849114035676], 13); // Centro inicial

// Adiciona uma camada de tiles ao mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Função para desenhar a área de cobertura baseado nas coordenadas das operadoras
function drawCoverageArea(operator) {
    // Se uma área de cobertura já existir, removê-la
    if (window.coveragePolygon) {
        map.removeLayer(window.coveragePolygon);
    }

    // Se a operadora existir nas coordenadas
    if (operatorCoordinates[operator]) {
        // Adiciona o polígono ao mapa
        window.coveragePolygon = L.polygon(operatorCoordinates[operator], { color: 'blue', fillColor: 'blue', fillOpacity: 0.3 })
            .addTo(map)
            .bindPopup(`Área de Cobertura da ${operator}`)
            .openPopup();
    }
}

// Adiciona o marcador com as coordenadas do Google Maps
const googleMapsCoordinates = [-19.909731888689432, -43.938849114035676];
const googleMapsMarker = L.marker(googleMapsCoordinates)
    .addTo(map)
    .bindPopup("Localização do Google Maps")
    .openPopup();

// Evento para o botão de verificar cobertura
document.getElementById('check-button').addEventListener('click', function () {
    const checkedOperators = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(el => el.value);
    const addressInput = document.getElementById('address-input').value;

    // Limpa o mapa
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
        if (layer instanceof L.Polygon) {
            map.removeLayer(layer);
        }
    });

    // Marcar áreas de cobertura das operadoras selecionadas
    checkedOperators.forEach(operator => {
        drawCoverageArea(operator);
    });

    if (addressInput) {
        // Simulação de coordenadas com base no endereço digitado
        const simulatedCoordinates = {
            'Rua A': { lat: -19.9090, lng: -43.9380 },
            'Rua B': { lat: -19.9100, lng: -43.9370 },
            'Rua C': { lat: -19.9110, lng: -43.9390 },
            'Rua D': { lat: -19.9080, lng: -43.9350 },
        };

        const coord = simulatedCoordinates[addressInput];

        if (coord) {
            map.setView(coord, 15); // Zoom para a localização do endereço
            L.marker([coord.lat, coord.lng]).addTo(map).bindPopup(`${addressInput}`).openPopup();
        } else {
            alert('Endereço não encontrado.');
        }
    }
});