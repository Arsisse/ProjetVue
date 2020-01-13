<template>
    <div id="restaurant-evaluation">
        <h2>Évaluations</h2>
        <md-table>
            <md-table-row>
                <md-table-head>Date</md-table-head>
                <md-table-head>Évaluation</md-table-head>
                <md-table-head>Note</md-table-head>
            </md-table-row>
            <md-table-row v-for="(note, index) in grades" v-bind:key="index">
                <md-table-cell>{{ note.date | formatDate }}</md-table-cell>
                <md-table-cell>{{ note.grade }}</md-table-cell>
                <md-table-cell>{{ note.score }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: 'RestaurantEvaluation',
        props: [
            'grades'
        ],
        data() {
            return {
            };
        },
        filters: {
            formatDate: function(value) {
                if (!value) return '';
                const date = new Date(Date.parse(value));
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return date.toLocaleDateString('fr-FR', options);
            }
        }
    }
</script>

<style scoped>
</style>