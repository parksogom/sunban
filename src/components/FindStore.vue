<template>
    <v-container>
        <v-toolbar fixed>
            <div @click="goBack" class="goBack">
            <v-icon size="28">
                chevron_left
            </v-icon>
            </div>
            <p>순.반 매장 찾기</p>
        </v-toolbar>

        <div style="height: 100%;">
            <v-row>
                <v-col>
                    <div style="margin: 20px; z-index: 10;">
                        <p>순대에 반하다 지점을 선택해주세요.</p>
                        <v-card>
                            <p class="pa-3">순대에 반하다 지점을 선택해주세요.</p>
                                <v-select
                                    v-model="status"
                                    :items="statusItems"
                                    outlined
                                ></v-select>
                        </v-card>
                    </div>
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