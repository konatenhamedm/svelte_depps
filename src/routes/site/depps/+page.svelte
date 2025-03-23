<script lang="ts">
    import Footer from "$components/Footer.svelte";
    import Slide from "$components/Slide.svelte";
    import Header from "$components/Header.svelte";
    export let data;
    let user = data.user;
  
    const stats = [
      { number: "50K+", label: "Patients suivis" },
      { number: "1000+", label: "Professionnels de santé" },
      { number: "99.9%", label: "Disponibilité" },
      { number: "24/7", label: "Support médical" }
    ];
  
    const team = [
      {
        name: "Dr. Sarah Martin",
        role: "Directrice Médicale",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop"
      },
      {
        name: "Dr. David Chen",
        role: "Directeur Recherche",
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop"
      },
      {
        name: "Dr. Emma Wilson",
        role: "Responsable Éthique Médicale",
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop"
      }
    ];
  
    const values = [
      {
        icon: "⚕️",
        title: "Excellence Médicale",
        description:
          "Notre engagement envers les plus hauts standards de pratique médicale guide chacune de nos actions."
      },
      {
        icon: "🔬",
        title: "Innovation Thérapeutique",
        description:
          "Nous intégrons les dernières avancées médicales pour offrir les meilleurs soins possibles."
      },
      {
        icon: "🤝",
        title: "Approche Humaine",
        description:
          "Nous plaçons l'humain au cœur de notre pratique, avec empathie et bienveillance."
      },
      {
        icon: "🛡️",
        title: "Éthique & Confidentialité",
        description:
          "La protection des données de santé et le respect du secret médical sont nos priorités absolues."
      }
    ];
  </script>
  
  
    <Slide {user} /> <br><br><br>
    <main>
      <section class="hata-404">
          <div class="h-yazi-ozel h-yazi-margin-ozel">           
          </div>
          <div class="tablo justify-center items-center">
              <div class="tablo--1-ve-2 project-image reveal-effect masker wow">
                  <div class="galeri-404" >
                      <img src="img/medicare-404.png" alt="Medicare 404" class="galeri-404__gorsel galeri-404__gorsel--3">
                  </div>
              </div>           
              <!--Galeri Görsel Alanı-->
              <div class="tablo--1-ve-2 wow fadeInUp">
                  <div class="bosluk1"></div>
                  <h2 class="h2-baslik-404"> Oups ! 404 </h2>
                  <h3 class="baslik-3-1 h-yazi-margin-kucuk">Page introuvable</h3>
                  <p class="paragraf-404">
                      La page que vous recherchez n'a pas été trouvée<br>
                      <a href="accueil">Ici, vous pouvez revenir à la <strong>page d'accueil </strong>.</a>
                  </p>
              </div>
          </div>
      </section>    
  </main>
    <Footer />
  
  
  <style>
    .text-center.content-value p {
      text-align: center;
      font-size: 14px;
    }
    .h2-baslik-anasayfa-ozel_autre {
      font-size: 1.5rem;
      font-weight: 900;
      text-transform: uppercase;
  
      background-image: linear-gradient(to right, #4b9bd8, #7158be);
      -webkit-background-clip: text;
      color: transparent;
      letter-spacing: 0.1rem;
    }
  </style>
  