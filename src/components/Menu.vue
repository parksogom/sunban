<template>
    <v-container>
        <div class="header">
            <div @click="goBack" class="goBack">
            <v-icon size="28">
                chevron_left
            </v-icon>
            </div>
            <p class="menu_title">메뉴상세</p>
        </div>
        <h2> menu </h2>

    </v-container>

</template>
<script>
    export default{
        name : "Menu",
        methods: {
            goBack() {
            this.$router.go(-1);
            },
        }
    }

</script>