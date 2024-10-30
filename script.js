// Inicializa o mapa  
let map = L.map("map").setView([-23.5505, -46.6333], 6); // Ajuste o centro inicial para visualizar a nova localização  

// Adiciona uma camada de tiles ao mapa  
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {  
    maxZoom: 19,  
    attribution: '© OpenStreetMap'  
}).addTo(map);  

// Variável para armazenar os marcadores  
let markers = [];  

// Adiciona o novo marcador com as coordenadas do Google Maps  
const googleMapsCoordinates = [-19.909731888689432, -43.938849114035676];  
const googleMapsMarker = L.marker(googleMapsCoordinates).addTo(map).bindPopup("Localização do Google Maps").openPopup();  
markers.push(googleMapsMarker);  

// Adiciona funcionalidade ao botão  
document.getElementById('check-button').addEventListener('click', function() {  
    const selectedOptions = Array.from(document.querySelectorAll('.checkbox-group input:checked'));  
    const addresses = document.getElementById('address-input').value;  
    const selectedValues = selectedOptions.map(option => option.value).join(', ');  

    document.getElementById('result').innerHTML = `Operadoras Selecionadas: ${selectedValues}, Endereço: ${addresses}`;  
    
    markAreas(selectedOptions); // Marca as áreas das operadoras selecionadas  
});  

function markAreas(selectedOptions) {  
    // Define coordenadas para cada operadora  
    const coordinates = {  
        'VERO': [-23.5505, -46.6333], // Exemplo para VERO  
        'CLARO': [-23.5617, -46.6252],  
        'IBI': [-23.5358, -46.6377],  
        'SUPER I': [-23.5461, -46.6470],  
        'GIGAMAIS': [-23.5500, -46.6570],  
        'BLINK': [-23.5600, -46.6000],  
        'SKY': [-23.5700, -46.6100],  
    };  

    // Remove os marcadores anteriores, se houver  
    markers.forEach(marker => map.removeLayer(marker));  
    markers = [];  

    // Adiciona marcadores para as operadoras selecionadas  
    selectedOptions.forEach(option => {  
        const coord = coordinates[option.value];  
        if (coord) {  
            const marker = L.marker(coord).addTo(map).bindPopup(option.value).openPopup();  
            markers.push(marker);  
            // Centraliza o mapa na área da primeira operadora  
            if (markers.length === 1) {  
                map.setView(coord, 12);  
            }  
        }  
    });  
    
    // Adiciona o marcador da localização do Google Maps novamente  
    markers.push(googleMapsMarker); // Entra com o marcador de Google Maps  
}