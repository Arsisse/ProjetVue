<template>
    <div id="restaurants-liste">
        <h1>Liste des restaurants</h1>
        <md-table>
            <md-table-row>
                <md-table-head>Nom</md-table-head>
                <md-table-head>Cuisine </md-table-head>
                <md-table-head></md-table-head>
                <md-table-head></md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="(restaurant, index) in restaurants" v-bind:key="index">
                <md-table-cell>{{ restaurant.name }}</md-table-cell>
                <md-table-cell> {{ restaurant.cuisine }}</md-table-cell>
                <md-table-cell><md-button class="md-raised md-accent" @click="details(restaurant._id)">Détails</md-button></md-table-cell>
                <md-table-cell><md-button class="md-raised md-accent" @click="supprimer(restaurant._id)">DELETE</md-button></md-table-cell>
                <md-table-cell><md-button class="md-raised" type="button" @click="afficherModifier(restaurant)">Modifier</md-button></md-table-cell>
            </md-table-row>
        </md-table>
        <md-button class="md-raised" @click="pagePrecedente()" :disabled="page == 0">Précédent</md-button>
        <md-button class="md-raised" @click="pageSuivante()" :disabled="(page+1)*resultats >= nbRestaurants">Suivant</md-button>
        <input type="range" min="5" max="100" step="5" v-model="resultats" @change="nbParPage"/>
        <md-field>
            <md-input type="text" placeholder="Rechercher ..." v-model="recherche"></md-input>
        </md-field>
        <form id="modifierForm" v-show="modifierId" @submit.prevent="modifier">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <md-field>
                        <input type="text" v-model="modifierId" hidden/>
                        <label>Nom :</label>
                        <md-input type="text" name="nom" required v-model="modifierNom"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <label>Cuisine :</label>
                        <md-input type="text" name="cuisine" required v-model="modifierCuisine"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-button type="submit" class="md-raised">Modifier</md-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'RestaurantsListe',
        data() {
            return {
                nbRestaurants: 0,
                page: 0,
                resultats: 10,
                recherche: '',
                restaurants: [
                ],
                nom: '',
                cuisine: '',
                modifierId: '',
                modifierNom: '',
                modifierCuisine: ''
            };
        },
        methods: {
            getRestaurantsFromServer() {
                const url = `http://localhost:8080/api/restaurants?page=${this.page}&pagesize=${this.resultats}&name=${this.recherche}`;
                const options = {
                    method: 'get'
                };

                fetch(url, options).then(response => {
                    response.json().then(restaurants => {
                        this.nbRestaurants = restaurants.count;
                        this.restaurants = restaurants.data;
                    });
                }).catch(error => {
                    console.error(error);
                });
            },
            ajouterRestaurant(event) {
                event.preventDefault();

                const data = new FormData(event.target);

                const url = 'http://localhost:8080/api/restaurants';
                const options = {
                    method: 'post',
                    body: data
                };

                fetch(url, options).then(() => {
                    this.getRestaurantsFromServer();
                });

                this.nom = "";
                this.cuisine = "";
            },
            pagePrecedente() {
                if (this.page > 0) {
                    this.page--;
                    this.getRestaurantsFromServer();
                }
            },
            pageSuivante() {
                if ((this.page+1)*this.resultats < this.nbRestaurants) {
                    this.page++;
                    this.getRestaurantsFromServer();
                }
            },
            nbParPage() {
                this.getRestaurantsFromServer();
            },
            supprimer(id) {
                const url = `http://localhost:8080/api/restaurants/${id}`;
                const options = {
                    method: 'delete'
                };

                fetch(url, options).then(() => {
                    this.getRestaurantsFromServer();
                });
            },
            afficherModifier(restaurant) {
                this.modifierId = restaurant._id;
                this.modifierNom = restaurant.name;
                this.modifierCuisine = restaurant.cuisine;
            },
            modifier() {
                const form = document.querySelector('#modifierForm');
                const data = new FormData(form);

                const url = `http://localhost:8080/api/restaurants/${this.modifierId}`;
                const options = {
                    method: 'put',
                    body: data
                };

                fetch(url, options).then(() => {
                    this.getRestaurantsFromServer();
                });

                this.modifierId = this.modifierNom = this.modifierCuisine = '';
            },
            details(id) {
                this.$router.push({ path: 'details', query: { id }});
            }
        },
        mounted() {
            this.getRestaurantsFromServer();
        },
        watch: {
            recherche: function() {
                this.getRestaurantsFromServer();
            }
        }
    };
</script>

<style scoped>
</style>