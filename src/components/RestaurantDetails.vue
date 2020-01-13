<template>
    <div id="restaurant-details">
        <div class="md-layout">
            <div class="md-layout-item">
                <h1>{{ details.name }}</h1>
            </div>
            <div class="md-layout-item">
                <router-link to="/liste">
                    <md-button class="md-raised float-right">Retour</md-button>
                </router-link>
            </div>
        </div>
        
        <div class="md-layout">
            <div class="md-layout-item">
                <h3>Cuisine {{ details.cuisine}}</h3>
                <p>
                    <span class="md-body-2">Adresse</span> : {{ details.address.building }} {{ details.address.street }}
                    <br/>
                    {{ details.address.zipcode }}, {{ details.borough }}
                </p>
                <p>
                    <span class="md-body-2">Coordonnées</span> : {{ details.address.coord[0] }}, {{ details.address.coord[1] }}
                </p>
            </div>
            <div class="md-layout-item">
                <div v-html="genMenu()">
                </div>
            </div>
        </div>

        <br/>

        <restaurant-evaluation :grades='details.grades'></restaurant-evaluation>
    </div>
</template>

<script>
    export default {
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
                modifierCuisine: '',
                details: {
                    address: {
                        zipcode: '',
                        borough: '',
                        coord: [
                            0,
                            0,
                        ],
                    },
                    borough: '',
                    cuisine: '',
                    grades: [],
                    name: '',
                },
                nomsMenus: [
                    'gastronomique',
                    'gourmand',
                    'simple',
                    'complet',
                    'exotique',
                    'extravagant',
                ],
                entrees: [
                    {
                        nom: 'Timbales de Jeanne',
                        prix: 4,
                    },
                    {
                        nom: 'Blinis',
                        prix: 5,
                    },
                    {
                        nom: 'Cake au jambon',
                        prix: 3,
                    },
                    {
                        nom: 'Velouté de champignons',
                        prix: 6,
                    }
                ],
                plats: [
                    {
                        nom: 'Tartiflette',
                        description: 'Une tartiflette dont tout le monde raffole',
                        photo: 'https://assets.afcdn.com/recipe/20160401/38946_w420h344c1cx2690cy1793.jpg',
                        prix: 10,
                    },
                    {
                        nom: 'Blanquette de veau',
                        description: 'La véritable blanquette de veau',
                        photo: 'https://assets.afcdn.com/recipe/20190529/93189_w420h344c1cx2886cy4330cxt0cyt0cxb5773cyb8660.jpg',
                        prix: 12,
                    },
                    {
                        nom: 'Lasagnes',
                        description: 'De délicieuses lasagnes à la bolognaise',
                        photo: 'https://assets.afcdn.com/recipe/20160630/63224_w420h344c1cx1500cy2248.jpg',
                        prix: 9,
                    },
                    {
                        nom: 'Couscous',
                        description: 'Un couscous complet pour se régaler',
                        photo: 'https://assets.afcdn.com/recipe/20160321/63230_w420h344c1cx2808cy1872.jpg',
                        prix: 11,
                    }
                ],
                desserts: [
                    {
                        nom: 'Tarte à la framboise',
                        prix: 7,
                    },
                    {
                        nom: 'Glace au citron',
                        prix: 4,
                    },
                    {
                        nom: 'Tiramisu',
                        prix: 6,
                    },
                    {
                        nom: 'Flan',
                        prix: 5
                    }
                ],
            };
        },
        methods: {
            loadInfos(id) {
                const url = `http://localhost:8080/api/restaurants/${id}`;
                const options = {
                    method: 'get'
                };

                fetch(url, options).then(response => {
                    response.json().then(infos => {
                        this.details = infos.restaurant;
                    });
                }).catch(error => {
                    console.error(error);
                });
            },
            randomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            },
            randomFromArray(array) {
                return array[this.randomInt(array.length)];
            },
            genMenu() {
                const entree = this.randomFromArray(this.entrees);
                const plat = this.randomFromArray(this.plats);
                const dessert = this.randomFromArray(this.desserts);
                return `
                    <h3>Menu ${this.randomFromArray(this.nomsMenus)} à ${this.randomInt(3) + 20} €</h3>
                    <h3>Entrée</h3>
                    <p>
                        ${ entree.nom }
                    </p>
                    <h3>Plat</h3>
                    <p>
                        ${ plat.nom } - ${ plat.description }
                    </p>
                    <img src="${ plat.photo }" alt="Image du plat" style="width: 150px; height: 150px;"/>
                    <h3>Dessert</h3>
                    <p>
                        ${ dessert.nom }
                    </p>
                `;
            }
        },
        mounted() {
            this.loadInfos(this.$route.query.id);
        },
        watch: {
            recherche: function() {
                this.getRestaurantsFromServer();
            }
        }
    };
</script>

<style scoped>
    .float-right {
        display: block;
        float: right;
    }
</style>