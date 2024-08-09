<template>
        <div class="dateModal-wrap" v-show="dateModalCheck" @click="dateModalOpen">
            <div class="dateModal-container" @click.stop="">
                
                <!--  모달창 content  -->
                
                <div class="dateModal-btn">
                    <v-btn @click="dateModalOpen">닫기</v-btn>
                    <v-btn @click="dateModalOpen">확인</v-btn>
                </div>
            </div>
        </div>

</template>

<script>
export default {
    data() {
        return {
            dateModalCheck: false,
        }
    },
    methods: {
        dateModalOpen() {
        this.dateModalCheck = !this.dateModalCheck
        }
    },
    watch: {
        modalCheck: function () {
        const html = document.querySelector('.  html-overflow');
        if( this.modalCheck === true ){
            html.style.overflow = 'hidden'
        } else {
            html.style.overflow = 'auto'}
        },
    }
}
</script>

<style scoped>
/* dimmed */
.dateModal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}
  /* modal or popup */
.dateModal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
</style>
