<script>
    import { onMount } from "svelte";
  
    export let apiKey = "AIzaSyDvlpPz-3nRwnzYQHvKXtnF_kApD9yR8IE"; // Remplace par ta clé API
    export let latitude = 5.345317;  // Exemple : Abidjan
    export let longitude = -4.024429; // Exemple : Abidjan
    export let zoom = 12;
  
    let mapDiv;
  
    onMount(() => {
      if (!apiKey) {
        console.error("Clé API Google Maps manquante !");
        return;
      }
  
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
  
      window.initMap = () => {
        new google.maps.Map(mapDiv, {
          center: { lat: latitude, lng: longitude },
          zoom: zoom,
        });
      };
    });
  </script>
  
  <div bind:this={mapDiv} class="w-full  rounded-lg shadow-lg border"></div>
  