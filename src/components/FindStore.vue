<template>
    <v-container style="padding: 0;">
        <div class="header">
            <div @click="goBack" class="goBack">
            <v-icon size="28">
                chevron_left
            </v-icon>
            </div>
            <p class="menu_title">메뉴상세</p>
        </div>

        <div style="height: 100%; padding: 0;">
            <v-row>
                <v-col class="back_color" >
                    <p class="pr-5 pl-5">순대에 반하다 지점을 선택해주세요.</p>
                    <v-select
                        v-model="status"
                        :items="statusItems"
                        outlined
                        class="pr-5 pl-5"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-item class="d-flex">
                                <v-img src="../assets/sunban/store_1.jpg" alt="순대에반하다_성남점" style="width: 90px;" class="rounded-xl ml-2"></v-img>
                                <div class="d-flex">
                                    <div>
                                        <p>순대에 반하다</p>
                                        <p class="font-weight-bold">성남점</p>
                                        <p>영업시간</p>
                                    </div>
                                    <p>복붙 아이콘</p>
                                </div>
                        </v-card-item>
                        <p>주소</p>
                        <p>사장님 멘트</p>
                        <p>사장님 멘트사장님 멘트사장님 멘트사장님 멘트사장님</p>
                    </v-card>
                </v-col>
            </v-row>
            <div>
                <KakaoMap />
            </div>
        </div>

    </v-container>

</template>
<script>
import KakaoMap from "./KakaoMap.vue";

export default{
    name : "FindStore",
    data(){
        return {
            status: null,
            statusItems: ['주문완료', '픽업완료'],
        }
    },
    methods: {
        goBack() {
        this.$router.go(-1);
        },
    }
}

</script>
<style>
v-img{
    width: 90px;
}

.back_color{
    background-color: #FCE4EC;
}
</style>