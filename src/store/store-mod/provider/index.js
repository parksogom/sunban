import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import router from "@/router"

export default {
  state: {
    oUser: null
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload
    }
  },
  getters: {
    fnGetUser(state) { // 사용자 정보
      return state.oUser
    },
    fnGetAuthStatus(state) { // 로그인 상태
      return (state.oUser != null)
    }
  },
  actions: {
    // 이메일 회원가입
    fnRegisterUser( {commit}, payload ) {
      commit("fnSetLoading", true) // 로딩 상태로 변경

      // 파이어베이스에 이메일 회원정보 저장
      firebase.auth().createUserWithEmailAndPassword(payload.pEmail, payload.pPassword)
        .then(pUserInfo => {
          // commit( "호출할 mutation 함수", "mutation 함수의 payload에 전달할 값" )
          commit("fnSetUser", {
            email: pUserInfo.user.email
          })
          commit("fnSetLoading", false)  // 로딩완료 상태로 변경
          commit("fnSetErrorMessage", "") // 스토어 에러메시지 초기화
          router.push("/Main") // 로그인 후 main 컴포넌트로 이동
        })
        .catch(err => {
          commit("fnSetErrorMessage", err.message)
          commit("fnSetLoading", false)
        })
    },

    // 이메일 로그인
    fnDoLogin( {commit}, payload ) {
      commit("fnSetLoading", true) // 로딩 상태로 변경

      // 파이어베이스에 이메일로 로그인 요청
      firebase.auth().signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
        .then(pUserInfo => {
          // commit( "호출할 mutation 함수", "mutation 함수의 payload에 전달할 값" )
          commit("fnSetUser", {
            name: pUserInfo.user.email
          })
          commit("fnSetLoading", false) // 로딩완료 상태로 변경
          commit("fnSetErrorMessage", "")
          router.push("/Main") // 로그인 후 main 컴포넌트로 이동
        })
        .catch(err => {
          commit("fnSetErrorMessage", err.message)
          commit("fnSetLoading", false)
        })
    },

    // 구글계정 로그인(팝업)
    fnDoGoogleLogin_Popup( {commit} ) {
      commit("fnSetLoading", true) // 로딩 상태로 변경

      // 파이어베이스에 구글 계정 로그인 요청
      // 로그인제공자 객체 생성
      var oProvider = new firebase.auth.GoogleAuthProvider();
      oProvider.addScope("profile");
      oProvider.addScope("email");
      firebase.auth().signInWithPopup(oProvider)
        .then(pUserInfo => {
          // commit( "호출할 mutation 함수", "mutation 함수의 payload에 전달할 값" )
          commit("fnSetUser", {
            id: pUserInfo.user.uid,
            name: pUserInfo.user.displayName,
            email: pUserInfo.user.email,
            photoURL: pUserInfo.user.photoURL
          })
          commit("fnSetLoading", false) // 로딩완료 상태로 변경
          commit("fnSetErrorMessage", "")
          router.push("/Main") // 로그인 후 main 컴포넌트로 이동
        })
        .catch(err => {
          commit("fnSetErrorMessage", err.message)
          commit("fnSetLoading", false)
        })
    },

    // 자동 로그인 처리
    fnDoLoginAuto( {commit}, pUserInfo ) {
      // 자동 로그인 시 스토어에 계정정보 저장
      commit("fnSetUser", {
        id: pUserInfo.uid,
        name: pUserInfo.displayName,
        email: pUserInfo.email,
        photoURL: pUserInfo.photoURL
      })
      commit("fnSetLoading", false) // 로딩완료 상태로 변경
      commit("fnSetErrorMessage", "")
    },

    // 로그아웃
    fnDoLogout( {commit} ) {
      firebase.auth().signOut()
      commit("fnSetUser", null)
      router.push("/")
    }
  }
}