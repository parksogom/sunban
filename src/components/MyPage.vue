<!-- 로그인 후 메인화면을 표시 -->
<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center">
                <h2 class="display-1 my-1">Logged</h2>
                <p class="body-1">로그인 한 사용자만 볼 수 있습니다.</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col dark offset="1" cols="10" class="mt-5 text-center">
                <img v-if="fnGetUser.photoURL" :src="fnGetUser.photoURL" class="avatar_style" alt="">
                <h3 class="pt-2 mt-4 grey lighten-2">{{ fnGetUser.name }}</h3>
                <p class="pb-2 grey lighten-2">{{fnGetUser.email}}</p>
            </v-col>
            <v-col offset="3" cols="6" class="text-center mt-1">
                <v-btn @click="fnSendPasswordReset" block color="green" large dark>
                <v-icon left>mdi-email</v-icon>
                    비밀번호 재설정
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { oFirebaseAuth } from "@/datasources/firebase"
    export default {
        computed: {
        fnGetUser() {
            let oUserInfo = this.$store.getters.fnGetUser
            return oUserInfo
            }
        },
        methods: {
            fnSendPasswordReset() {
            oFirebaseAuth.sendPasswordResetEmail(this.fnGetUser.email).then(function () {
                console.log("비밀번호 재설정메일을 발송했습니다!")
            }).catch(function (error) {
                console.log(error);
            })
        }
        }
    }
</script>

<style>
.avatar_style {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    }
</style>