<template>
  <v-app>
    <v-container>
      <v-main>
        <router-view/>
      </v-main>
    </v-container>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-bottom-navigation
        :value="value"
        color="pink accent-1"
        fixed>
          
        <v-btn x-large @click="toHome">
          <v-icon large>home</v-icon>
        </v-btn>
      
        <v-btn x-large @click="toFindStore">
          <v-icon large>search</v-icon>
        </v-btn>
      
        <v-btn x-large @click="toMenu">
          <v-icon large>local_dining</v-icon>
        </v-btn>
      
        <v-btn x-large @click="toMyPage">
          <v-icon large>person</v-icon>
        </v-btn>
      </v-bottom-navigation>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    toHome() {
      this.$router.push("/")
    },
    toFindStore() {
      this.$router.push("/FindStore")
    },
    toMenu() {
      this.$router.push("/Menu")
    },
    toMyPage() {
      this.$router.push("/MyPage")
    }
  },
};
</script>

<style>
.container {
  margin: 0 !important;
  padding: 0 !important;
}
.v-btn{
  background: transparent !important;
}

.v-bottom-navigation {
  /* position: fixed !important; */
  /* bottom: 0; */
  height: 72px !important;
  display: flex;
  justify-content: space-around !important;
  box-sizing: border-box;
  /* z-index: 9999 !important; */
  background-color: #ffffff;
}

.v-application, .d-flex {
  display: flex ;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Noto Sans KR';
}
</style>