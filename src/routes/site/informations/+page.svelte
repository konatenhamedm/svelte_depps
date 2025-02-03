<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>

    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(726px, 607px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(751px, 632px);"></div><div id="">
      <Header />
      <Slide />
      <style>
  .tablo:not(:last-child) {
      margin-bottom: 35px;
  }
  .form__input {
      width: 100%;
  }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<section class="hakkimizda-bolumu-anasayfa1" style="padding-top:150px">
  <div class="container">
      <div class="col-md-12 masqueur à effet de révélation d'image de projet wow  animated" style="visibility: visible;">
          <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"> Inscription</h2>
          <form action="two_customer" class="form two_customer" method="post">
              <div class="row" style="font-size: 14px;">
                   
                      <div class="col-md-4">
                          <h3>Médecins</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Médecins">
                              Médecins</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Médecins spécialistes">
                              Médecins spécialistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Chirurgiens-dentistes">
                              Chirurgiens-dentistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Chirurgiens-dentistes spécialistes">
                              Chirurgiens-dentistes spécialistes</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Professions de pharmacie et de la physique médicale</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Pharmaciens">
                              Pharmaciens</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Pharmaciens spécialistes">
                              Pharmaciens spécialistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Physiciens médicaux">
                              Physiciens médicaux</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Infirmiers">
                              Infirmiers</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Infirmiers spécialistes">
                              Infirmiers spécialistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Sages-femmes">
                              Sages-femmes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Sages-femmes spécialistes">
                              Sages-femmes spécialistes</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Professions paramédicales </h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Diététicien">
                              Diététicien</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Opticiens / Optométristes">
                              Opticiens / Optométristes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Audioprothésistes">
                              Audioprothésistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Orthoprothésistes">
                              Orthoprothésistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Pédicure, podologue">
                              Pédicure, podologue</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Assistants dentistes">
                              Assistants dentistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Psychomotriciens">
                              Psychomotriciens</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Ergothérapeutes">
                              Ergothérapeutes</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Technicien Supérieur de la Santé</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Biologie Médicale">
                              Biologie Médicale</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Hygiène et Assainissement">
                              Hygiène et Assainissement</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Imagerie Médicale">
                              Imagerie Médicale</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Biomédicale">
                              Biomédicale</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Kinésithérapie">
                              Kinésithérapie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Prothèse Dentaire">
                              Prothèse Dentaire</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Préparation et Gestion en Pharmacie">
                              Préparation et Gestion en Pharmacie</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Auxiliaire des techniques sanitaire</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Soins obstétricaux">
                              Soins obstétricaux</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Soins Infirmiers">
                              Soins Infirmiers</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Pharmacie">
                              Pharmacie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Laboratoire">
                              Laboratoire</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Hygiène et Assainissement">
                              Hygiène et Assainissement</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Imagerie Médicale">
                              Imagerie Médicale</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Ingénieur des Techniques Sanitaires</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Préparation et Gestion en Pharmacie ">
                              Préparation et Gestion en Pharmacie </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Biologie Médicale ">
                              Biologie Médicale </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Hygiène et Assainissement ">
                              Hygiène et Assainissement </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Imagerie Médicale ">
                              Imagerie Médicale </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Biomédicale ">
                              Biomédicale </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Santé Publique">
                              Santé Publique</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Ingénieur des Services de Santé</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Préparation et gestion en Pharmacie  ">
                              Préparation et gestion en Pharmacie  </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Biologie Médicale  ">
                              Biologie Médicale  </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Hygiène et Assainissement  ">
                              Hygiène et Assainissement  </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Imagerie Médicale  ">
                              Imagerie Médicale  </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Biomédicale  ">
                              Biomédicale  </label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Economie de la Santé">
                              Economie de la Santé</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Santé Public">
                              Santé Public</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Epidémiologie">
                              Epidémiologie</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Profession de médecine traditionnelle</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Naturothérapeutes">
                              Naturothérapeutes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Phytothérapeutes">
                              Phytothérapeutes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Psychothérapeutes">
                              Psychothérapeutes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Herboristes">
                              Herboristes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Médico-droguistes">
                              Médico-droguistes</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Accoucheuses traditionnelles">
                              Accoucheuses traditionnelles</label><br>
                           
                          <br>
                      </div>
                   
                      <div class="col-md-4">
                          <h3>Professions de médecine alternative et complémentaire</h3>
                           
                              <label>
                              <input type="radio" name="profession" value="Naturothérapie">
                              Naturothérapie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Praticiens d’acupuncture">
                              Praticiens d’acupuncture</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Homéopathie">
                              Homéopathie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Naturopathie">
                              Naturopathie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Phytothérapie">
                              Phytothérapie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Chiropractie">
                              Chiropractie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Ostéopathie">
                              Ostéopathie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Psychothérapie">
                              Psychothérapie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Hypnothérapie">
                              Hypnothérapie</label><br>
                           
                              <label>
                              <input type="radio" name="profession" value="Massothérapie">
                              Massothérapie</label><br>
                           
                          <br>
                      </div>
                   
                  <br>	
              </div>
              <div class="row" style="margin-bottom: 0px;">
                  <br><br>
                  <div class="col-md-4">
                      <div class="form__grup">
                          <label for="lieu" class="form_label">Civilité</label>
                          <select name="civility" class="form__input" id="">
                              <option>M.</option>
                              <option>Mme</option>
                              <option>Mlle</option>
                          </select>
                      </div>
                      <div class="form__grup">
                          <label for="password" class="form_label">Date de naissance</label>
                          <input type="date" class="form__input" style="width:100%" placeholder="Date de naissance" id="txt_eposta" name="date_naissance" required="" value="">
                      </div>
                      <div class="form__grup">
                          <label for="address_pro" class="form_label">Nationalité</label>
                          <select name="nationalite" class="form__input" id="">
                                                                  <option>Afghanistan</option>
                                                                  <option>Albania</option>
                                                                  <option>Algeria</option>
                                                                  <option>American Samoa</option>
                                                                  <option>Andorra</option>
                                                                  <option>Angola</option>
                                                                  <option>Anguilla</option>
                                                                  <option>Antarctica</option>
                                                                  <option>Antigua and Barbuda</option>
                                                                  <option>Argentina</option>
                                                                  <option>Armenia</option>
                                                                  <option>Aruba</option>
                                                                  <option>Australia</option>
                                                                  <option>Austria</option>
                                                                  <option>Azerbaijan</option>
                                                                  <option>Bahamas</option>
                                                                  <option>Bahrain</option>
                                                                  <option>Bangladesh</option>
                                                                  <option>Barbados</option>
                                                                  <option>Belarus</option>
                                                                  <option>Belgium</option>
                                                                  <option>Belize</option>
                                                                  <option>Benin</option>
                                                                  <option>Bermuda</option>
                                                                  <option>Bhutan</option>
                                                                  <option>Bolivia</option>
                                                                  <option>Bosnia and Herzegowina</option>
                                                                  <option>Botswana</option>
                                                                  <option>Bouvet Island</option>
                                                                  <option>Brazil</option>
                                                                  <option>British Indian Ocean Territory</option>
                                                                  <option>Brunei Darussalam</option>
                                                                  <option>Bulgaria</option>
                                                                  <option>Burkina Faso</option>
                                                                  <option>Burundi</option>
                                                                  <option>Cambodia</option>
                                                                  <option>Cameroon</option>
                                                                  <option>Canada</option>
                                                                  <option>Cape Verde</option>
                                                                  <option>Caraïbes focales</option>
                                                                  <option>Cayman Islands</option>
                                                                  <option>Central African Republic</option>
                                                                  <option>Chad</option>
                                                                  <option>Chile</option>
                                                                  <option>China</option>
                                                                  <option>Christmas Island</option>
                                                                  <option>Cocos (Keeling) Islands</option>
                                                                  <option>Colombia</option>
                                                                  <option>Comoros</option>
                                                                  <option>Congo</option>
                                                                  <option>Congo, the Democratic Republic of the</option>
                                                                  <option>Cook Islands</option>
                                                                  <option>Costa Rica</option>
                                                                  <option>Cote d'Ivoire</option>
                                                                  <option>Croatia (Hrvatska)</option>
                                                                  <option>Cuba</option>
                                                                  <option>Cyprus</option>
                                                                  <option>Czech Republic</option>
                                                                  <option>Denmark</option>
                                                                  <option>Djibouti</option>
                                                                  <option>Dominica</option>
                                                                  <option>Dominican Republic</option>
                                                                  <option>East Timor</option>
                                                                  <option>Ecuador</option>
                                                                  <option>Egypt</option>
                                                                  <option>El Salvador</option>
                                                                  <option>Equatorial Guinea</option>
                                                                  <option>Eritrea</option>
                                                                  <option>Estonia</option>
                                                                  <option>Ethiopia</option>
                                                                  <option>Falkland Islands (Malvinas)</option>
                                                                  <option>Faroe Islands</option>
                                                                  <option>Fiji</option>
                                                                  <option>Finland</option>
                                                                  <option>France</option>
                                                                  <option>France Metropolitan</option>
                                                                  <option>French Guiana</option>
                                                                  <option>French Polynesia</option>
                                                                  <option>French Southern Territories</option>
                                                                  <option>Gabon</option>
                                                                  <option>Gambia</option>
                                                                  <option>Georgia</option>
                                                                  <option>Germany</option>
                                                                  <option>Ghana</option>
                                                                  <option>Gibraltar</option>
                                                                  <option>Greece</option>
                                                                  <option>Greenland</option>
                                                                  <option>Grenada</option>
                                                                  <option>Guadeloupe</option>
                                                                  <option>Guam</option>
                                                                  <option>Guatemala</option>
                                                                  <option>Guinea</option>
                                                                  <option>Guinea-Bissau</option>
                                                                  <option>Guyane</option>
                                                                  <option>Haiti</option>
                                                                  <option>Heard and Mc Donald Islands</option>
                                                                  <option>Holy See (Vatican City State)</option>
                                                                  <option>Honduras</option>
                                                                  <option>Hong Kong</option>
                                                                  <option>Hungary</option>
                                                                  <option>Iceland</option>
                                                                  <option>India</option>
                                                                  <option>Indonesia</option>
                                                                  <option>Iran (Islamic Republic of)</option>
                                                                  <option>Iraq</option>
                                                                  <option>Ireland</option>
                                                                  <option>Israel</option>
                                                                  <option>Italy</option>
                                                                  <option>Jamaica</option>
                                                                  <option>Japan</option>
                                                                  <option>Jordan</option>
                                                                  <option>Kazakhstan</option>
                                                                  <option>Kenya</option>
                                                                  <option>Kiribati</option>
                                                                  <option>Korea, Democratic People's Republic of</option>
                                                                  <option>Korea, Republic of</option>
                                                                  <option>Kuwait</option>
                                                                  <option>Kyrgyzstan</option>
                                                                  <option>Lao, People's Democratic Republic</option>
                                                                  <option>Latvia</option>
                                                                  <option>Lebanon</option>
                                                                  <option>Lesotho</option>
                                                                  <option>Liberia</option>
                                                                  <option>Libyan Arab Jamahiriya</option>
                                                                  <option>Liechtenstein</option>
                                                                  <option>Lithuania</option>
                                                                  <option>Luxembourg</option>
                                                                  <option>Macau</option>
                                                                  <option>Macedonia, The Former Yugoslav Republic of</option>
                                                                  <option>Madagascar</option>
                                                                  <option>Malawi</option>
                                                                  <option>Malaysia</option>
                                                                  <option>Maldives</option>
                                                                  <option>Mali</option>
                                                                  <option>Malta</option>
                                                                  <option>Marshall Islands</option>
                                                                  <option>Martinique</option>
                                                                  <option>Mauritania</option>
                                                                  <option>Mauritius</option>
                                                                  <option>Mayotte</option>
                                                                  <option>Mexico</option>
                                                                  <option>Micronesia, Federated States of</option>
                                                                  <option>Moldova, Republic of</option>
                                                                  <option>Monaco</option>
                                                                  <option>Mongolia</option>
                                                                  <option>Montserrat</option>
                                                                  <option>Morocco</option>
                                                                  <option>Mozambique</option>
                                                                  <option>Myanmar</option>
                                                                  <option>Namibia</option>
                                                                  <option>Nauru</option>
                                                                  <option>Nepal</option>
                                                                  <option>Netherlands</option>
                                                                  <option>Netherlands Antilles</option>
                                                                  <option>New Caledonia</option>
                                                                  <option>New Zealand</option>
                                                                  <option>Nicaragua</option>
                                                                  <option>Niger</option>
                                                                  <option>Nigeria</option>
                                                                  <option>Niue</option>
                                                                  <option>Norfolk Island</option>
                                                                  <option>Northern Mariana Islands</option>
                                                                  <option>Norway</option>
                                                                  <option>Oman</option>
                                                                  <option>Pakistan</option>
                                                                  <option>Palau</option>
                                                                  <option>Panama</option>
                                                                  <option>Papua New Guinea</option>
                                                                  <option>Paraguay</option>
                                                                  <option>Peru</option>
                                                                  <option>Philippines</option>
                                                                  <option>Pitcairn</option>
                                                                  <option>Poland</option>
                                                                  <option>Portugal</option>
                                                                  <option>Puerto Rico</option>
                                                                  <option>Qatar</option>
                                                                  <option>Reunion</option>
                                                                  <option>Romania</option>
                                                                  <option>Russian Federation</option>
                                                                  <option>Rwanda</option>
                                                                  <option>Saint Kitts and Nevis</option>
                                                                  <option>Saint Lucia</option>
                                                                  <option>Saint Vincent and the Grenadines</option>
                                                                  <option>Samoa</option>
                                                                  <option>San Marino</option>
                                                                  <option>Sao Tome and Principe</option>
                                                                  <option>Saudi Arabia</option>
                                                                  <option>Senegal</option>
                                                                  <option>Seychelles</option>
                                                                  <option>Sierra Leone</option>
                                                                  <option>Singapore</option>
                                                                  <option>Slovakia (Slovak Republic)</option>
                                                                  <option>Slovenia</option>
                                                                  <option>Solomon Islands</option>
                                                                  <option>Somalia</option>
                                                                  <option>South Africa</option>
                                                                  <option>South Georgia and the South Sandwich Islands</option>
                                                                  <option>Spain</option>
                                                                  <option>Sri Lanka</option>
                                                                  <option>St. Helena</option>
                                                                  <option>St. Pierre and Miquelon</option>
                                                                  <option>Sudan</option>
                                                                  <option>Suriname</option>
                                                                  <option>Svalbard and Jan Mayen Islands</option>
                                                                  <option>Swaziland</option>
                                                                  <option>Sweden</option>
                                                                  <option>Switzerland</option>
                                                                  <option>Syrian Arab Republic</option>
                                                                  <option>Taiwan, Province of China</option>
                                                                  <option>Tajikistan</option>
                                                                  <option>Tanzania, United Republic of</option>
                                                                  <option>Thailand</option>
                                                                  <option>Togo</option>
                                                                  <option>Tokelau</option>
                                                                  <option>Tonga</option>
                                                                  <option>Trinidad and Tobago</option>
                                                                  <option>Tunisia</option>
                                                                  <option>Turkey</option>
                                                                  <option>Turkmenistan</option>
                                                                  <option>Turks and Caicos Islands</option>
                                                                  <option>Tuvalu</option>
                                                                  <option>Uganda</option>
                                                                  <option>Ukraine</option>
                                                                  <option>United Arab Emirates</option>
                                                                  <option>United Kingdom</option>
                                                                  <option>United States</option>
                                                                  <option>United States Minor Outlying Islands</option>
                                                                  <option>Uruguay</option>
                                                                  <option>Uzbekistan</option>
                                                                  <option>Vanuatu</option>
                                                                  <option>Venezuela</option>
                                                                  <option>Vietnam</option>
                                                                  <option>Virgin Islands (British)</option>
                                                                  <option>Virgin Islands (U.S.)</option>
                                                                  <option>Wallis and Futuna Islands</option>
                                                                  <option>Western Sahara</option>
                                                                  <option>Yemen</option>
                                                                  <option>Yugoslavia</option>
                                                                  <option>Zambia</option>
                                                                  <option>Zimbabwe</option>
                                                          </select>
                      </div>
                      <div class="form__grup">
                          <label for="address_pro" class="form_label">Pôle sanitaire, District, Ville, Commune, quartier, lot, ilot</label>
                          <input type="text" class="form__input" style="width:100%" placeholder="Pôle sanitaire, District, Ville, Commune, quartier, lot, ilot" id="txt_eposta" name="lieu_de_residence" required="" value="">
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="form__grup">
                          <label for="lieu" class="form_label">Adresse email</label>
                          <input type="email" class="form__input" style="width:100%" placeholder="Adresse email" id="txt_eposta" name="adresse_email" required="" value="">
                      </div>
                      <div class="form__grup">
                          <label for="password" class="form_label">Contact</label>
                          <input type="text" class="form__input" style="width:100%" placeholder="Contact" id="txt_eposta" name="contact_perso" required="" value="">
                      </div>
                      <div class="form__grup">
                          <label for="address_pro" class="form_label">Situation matrimoniale</label>
                          <select name="situation" class="form__input" id="">
                              <option>Marié</option>
                              <option>Célibataire</option>
                              <option>Veuf/Veuve</option>
                          </select>
                      </div>
                      <div class="form__grup">
                          <label for="address_pro" class="form_label">Dénomination du diplôme</label>
                          <input type="text" class="form__input" style="width:100%" placeholder="Dénomination du diplôme" id="txt_eposta" name="diplome" required="" value="">
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="form__grup">
                          <label for="lieu" class="form_label">Date d'obtention du diplôme</label>
                          <input type="date" class="form__input" style="width:100%" placeholder="Date d'obtention du diplôme" id="txt_eposta" name="date_diplome" required="" value="">
                      </div>
                      <div class="form__grup">
                          <label for="password" class="form_label">Lieu d'obtention du diplôme</label>
                          <input type="text" class="form__input" style="width:100%" placeholder="Lieu d'obtention du diplôme" id="txt_eposta" name="lieu_diplome" required="" value="">
                      </div>
                      <div class="form__grup">
                          <label for="password" class="form_label">Date d'obtention de premier emploi</label>
                          <input type="date" class="form__input" style="width:100%" placeholder="Date d'obtention de pemier emploi" id="txt_eposta" name="date_emploi" required="" value="">
                      </div>
                      <div class="form__grup">
                          <label for="address_pro" class="form_label">Situation professionelle</label>
                          <input type="text" class="form__input" style="width:100%" placeholder="Situation professionelle" id="txt_eposta" name="situation_pro" required="" value="">
                      </div>
                  </div>
              </div>
              <br>
              <div class="form__grup">
                  <a href="professionnel-de-sante" class="buton buton--kirmizi">← RETOUR</a>
                  <button class="buton buton--kirmizi" id="two_customer">SUIVANT →</button>
              </div><br>
          </form>
      </div>
  </div>
</section>



          <style>
              .footerss p {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
              h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
          </style>  
          <Footer/>
  

</div>