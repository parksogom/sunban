<template>
  <v-container flow>
    <v-row>
      <v-col cols="12" class="text-center">
        <h2 class="display-1 my-1">MEMBER</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
        <form @submit.prevent="fnRegisterUser">
          <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required></v-text-field>
          <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required>
          </v-text-field>
          <v-text-field name="ConfirmPassword" label="비밀번호 확인" type="password" v-model="sConfirmPassword" required
            :rules="[fnComparePassword]">
          </v-text-field>
          <v-btn type="submit" v-if="!fnGetLoading" color="green" dark>
            회원가입
          </v-btn>
          <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="green">
          </v-progress-circular>
          <v-alert type="error" dismissible v-model="bAlert">
            {{ fnGetErrMsg }}
          </v-alert>
        </form>
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
        sConfirmPassword: "",
        bAlert: false
      }
    },
    computed: {
      fnComparePassword() {
        if (this.sPassword == this.sConfirmPassword) return true
        else return "비밀번호가 일치하지 않습니다!"
      },
      fnGetLoading() {
        return this.$store.getters.fnGetLoading
      },
      fnGetErrMsg() {
        return this.$store.getters.fnGetErrorMessage
      }
    },
    methods: {
      fnRegisterUser() {
        if (this.fnComparePassword == true) {
          this.$store.dispatch("fnRegisterUser", {
            pEmail: this.sEmail,
            pPassword: this.sPassword
          })
        }
      }
    },
    watch: {
      // getErrorMsg 함수가 오류 메세지를 반환했을 때 메세지 출력
      fnGetErrMsg(pMsg) {
        if (pMsg) this.bAlert = true
      },
      // checkAlert 값이 false로 바뀌면 store의 오류 메세지 초기화
      bAlert(pValue) {
        if (pValue == false) this.$store.commit("fnSetErrorMessage", "")
      }
    }
  }
</script>