<template>
    <div>
        <v-toolbar fixed-tabs>
            <v-tabs color="black" grow v-model="tab">
                <v-tabs-slider color="black"></v-tabs-slider>
                <v-tab href="#stores">가까운 매장</v-tab>
                <v-tab href="#map">지도</v-tab>
            </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="tab" style="height: 100%;">
            <v-tab-item value="stores">
                    <v-card style="margin: 20px">
                        <p class="pa-3">현재 위치에서 5Km 이내 매장에서만 주문할 수 있습니다. 크라운오더는 매장운영 종료 시간 30분 전 마감됩니다. </p>
                    </v-card>

            <v-list>
                <v-list-item v-for="store in stores" :key="store.locId" @click="selectStore(store)">
                    <div class="loclist_box">
                        <v-img class="loc_img_rounded" :src="store.loc_img" cover />
                    <div class="loclist_box_title">
                        <span>{{store.name}}</span>
                        <span>{{store.address}}</span>
                        <span> {{store.영업시간}} </span>
                    </div>
                    </div>
                </v-list-item>
            </v-list>
            </v-tab-item>
    
            <v-tab-item value="map" style="  height:100vh">
                <v-card style="margin: 20px; z-index: 10;">
                    <p class="pa-3">현재 위치에서 5Km 이내 매장에서만 주문할 수 있습니다. 크라운오더는 매장운영 종료 시간 30분 전 마감됩니다. </p>
                </v-card>
                <div>
                    <KakaoMap />
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
    <v-container>
        <!-- 상단에 입력한 코멘트와 별점을 표시 -->
        <v-card>
          <v-card-title>입력한 코멘트와 별점</v-card-title>
          <v-card-subtitle>코멘트: {{ submittedComment }}</v-card-subtitle>
          <v-card-subtitle>
            별점: <v-rating :value="submittedRating" color="amber" background-color="grey lighten-2" readonly></v-rating>
          </v-card-subtitle>
        </v-card>
  
        <!-- 코멘트 및 비밀번호 입력 폼 -->
        <v-form ref="form" v-model="formValid">
          <v-textarea
            v-model="comment"
            :rules="[rules.maxLength]"
            label="코멘트 (최대 30자)"
            maxlength="30"
            required
          ></v-textarea>
          <v-rating
            v-model="rating"
            :length="5"
            color="amber"
            background-color="grey lighten-2"
            required
          ></v-rating>
          <v-text-field
            v-model="password"
            label="비밀번호 (6자리)"
            :type="passwordVisible ? 'text' : 'password'"
            @click:append="togglePasswordVisibility"
            append-icon="mdi-eye"
            maxlength="6"
            minlength="6"
            required
          ></v-text-field>
          <v-btn @click="submitComment" :disabled="!formValid">제출</v-btn>
        </v-form>
  
        <!-- 비밀번호 입력 다이얼로그 -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>코멘트 수정/삭제</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="passwordToCheck"
                label="비밀번호"
                :type="passwordVisible ? 'text' : 'password'"
                @click:append="togglePasswordVisibility"
                append-icon="mdi-eye"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="checkPassword">확인</v-btn>
              <v-btn @click="dialog = false">취소</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  
        <!-- 비밀번호 입력을 위한 버튼 -->
        <v-btn @click="openDialog">코멘트 수정/삭제</v-btn>
      </v-container>
</template>


<script>
import KakaoMap from "./KakaoMap.vue";
import { CommonOption } from '@/datasources/StoreList';

export default{
    name:"StoreSelection",
    data(){
        return{
            tab: "stores",
            // stores를 추가
            stores: CommonOption.locationList,

            comment: '',
        rating: 0,
        password: '',
        passwordToCheck: '',
        formValid: false,
        dialog: false,
        passwordVisible: false,
        submittedComment: '',
        submittedRating: 0,
        storedPassword: '' // 저장된 비밀번호
            
        }
    },
    components: {
        KakaoMap,
    },
    computed: {
    rules() {
        return {
        maxLength: v => v.length <= 30 || '최대 30자까지 입력 가능합니다.'
        };
    }
    },
    mounted() {

    },
    methods:{
        // 매장 선택
        selectStore(store) {
        this.$store.dispatch('storeSelection', store);
        this.$router.push('/cart'); // 선택 후 카트 페이지로 이동
    },
    submitComment() {
        if (this.password.length !== 6) {
          alert('비밀번호는 6자리여야 합니다.');
          return;
        }
        this.submittedComment = this.comment;
        this.submittedRating = this.rating;
        this.storedPassword = this.password; // 저장된 비밀번호 업데이트
        this.comment = '';
        this.rating = 0;
        this.password = '';
        this.$refs.form.resetValidation();
      },
      openDialog() {
        this.dialog = true;
      },
      checkPassword() {
        if (this.passwordToCheck === this.storedPassword) {
          // 비밀번호가 일치할 때 처리할 로직
          console.log('비밀번호 일치');
          this.dialog = false;
          // 추가적인 수정/삭제 로직을 여기에 추가할 수 있습니다.
        } else {
          // 비밀번호가 불일치할 때 처리할 로직
          console.log('비밀번호 불일치');
          alert('비밀번호가 일치하지 않습니다.');
        }
      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      }
    }
}

</script>

<style>
.loclist_box{
    display: flex;
    padding: 1em;
    gap: 10px;
    box-sizing: border-box;
}
.loclist_box_title{
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    justify-content: center;
}
.loclist_box_title span:nth-child(1){
    font-weight: bold;
}
.loclist_box_title span:nth-child(2){
    font-size: 12px;
}
.loclist_box_title span:nth-child(3){
    font-size: 12px;
}
.loc_img_rounded{
    border-radius: 15px !important;
    border: 1px solid #fbfbfb;
    width: 100px; 
    height: 100px; 
}

</style>
