export default {
  state: {
    bIsLoading: false, // 로딩 처리
    sErrorMessage: "" // 오류 메세지
  },
  mutations: {
    fnSetLoading(state, payload) {
      state.bIsLoading = payload
    },
    fnSetErrorMessage(state, payload) {
			state.sErrorMessage = payload
    }
	},
  getters: {
		fnGetLoading (state) {
      return state.bIsLoading
    },
		fnGetErrorMessage (state) {
			return state.sErrorMessage
		}
	}
}