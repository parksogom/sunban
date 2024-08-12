<template>
  <v-container flow>
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="display-1 my-1">LOGIN</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
        <form @submit.prevent="fnDoLogin">
          <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required>
          </v-text-field>
          <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required>
          </v-text-field>
          <v-btn type="submit" v-if="!fnGetLoading" color="green" dark>
            로그인
          </v-btn>
          <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="green">
          </v-progress-circular>
          <v-alert class="mt-3" type="error" dismissible v-model="bAlert">
            {{ fnGetErrMsg }}
          </v-alert>
        </form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="display-1 my-1">HOME</h2>
            <p class="body-1">첫 번째 화면입니다.</p>
      </v-col>
    </v-row>

    <v-row v-if="fnGetLoading">
      <v-col class="text-center">
        <v-progress-circular indeterminate :width="7" :size="70" color="blue">
        </v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col offset="3" cols="6" class="text-center">
        <v-btn @click="fnDoGoogleLogin_Popup" block outlined color="blue" large dark>
          <v-icon left>mdi-google</v-icon>
          구글 로그인
        </v-btn>
      </v-col>

      <v-col offset="3" cols="6" class="text-center">
        <v-btn to="/login" block color="green" large dark>
          <v-icon left>mdi-email</v-icon>
          이메일 로그인
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        sEmail: "",
        sPassword: "",
        bAlert: false
      }
    },
    computed: {
      // 시간지연상태 스토어에서 읽어서 반환
      fnGetLoading() {
        return this.$store.getters.fnGetLoading;
      },
      fnGetErrMsg() {
        return this.$store.getters.fnGetErrorMessage;
      }
    },
    methods: {
      fnDoLogin() {
        this.$store.dispatch("fnDoLogin", {
          // 전송할 데이터(payload)
          pEmail: this.sEmail,
          pPassword: this.sPassword
        })
      },
      fnDoGoogleLogin_Popup() { // 스토어에 구글계정 로그인 처리 요청
        this.$store.dispatch("fnDoGoogleLogin_Popup")
      }
    },
    watch: {
      // getErrorMsg 함수가 오류 메세지를 반환했을 때 메세지 출력
      fnGetErrMsg(pMsg) {
        if (pMsg) this.bAlert = true;
      },
      bAlert(pValue) {
        // checkAlert 값이 false로 바뀌면 store의 오류 메세지 초기화
        if (pValue == false) this.$store.commit("fnSetErrorMessage", "");
      }
    }
  }
</script>