<template>
  <v-app>
    <v-container>
      <v-row>
        <!-- 셀렉트폼 -->
        <v-col cols="12" md="4">
          <v-select
            v-model="status"
            :items="statusItems"
            label="상태 선택"
            outlined
          ></v-select>
        </v-col>

        <!-- 탭 -->
        <v-col cols="12" md="4">
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab>주문</v-tab>
            <v-tab>예약</v-tab>
          </v-tabs>
        </v-col>

        <!-- 날짜 설정 -->
        <v-col cols="12" md="4">
          <v-menu
            ref="menu"
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRange"
                label="날짜 선택"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              range
              @input="saveDateRange"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <!-- 검색 결과 -->
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="filteredOrders"
            item-key="id"
          >
            <template v-slot:item.date="{ item }">
              <td>{{ formatDate(item.date) }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      status: null,
      statusItems: ['주문완료', '픽업완료'],
      tab: 0, // 0은 주문, 1은 예약을 의미
      dateMenu: false,
      dateRange: '',
      dates: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: '상태', value: 'status' },
        { text: '날짜', value: 'date' },
      ],
      orders: [
        // 예시 데이터
        { id: 1, status: '주문완료', date: '2024-08-01', type: '주문' },
        { id: 2, status: '픽업완료', date: '2024-08-05', type: '예약' },
        { id: 3, status: '주문완료', date: '2024-08-10', type: '예약' },
        { id: 4, status: '픽업완료', date: '2024-08-15', type: '주문' },
      ],
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        const isStatusMatch = !this.status || order.status === this.status;
        const isTabMatch =
          this.tab === 0
            ? order.type === '주문'
            : order.type === '예약';
        const isDateMatch =
          !this.dates.length ||
          (new Date(order.date) >= new Date(this.dates[0]) &&
            new Date(order.date) <= new Date(this.dates[1]));

        return isStatusMatch && isTabMatch && isDateMatch;
      });
    },
  },
  methods: {
    saveDateRange() {
      this.dateRange = `${this.dates[0]} - ${this.dates[1]}`;
      this.dateMenu = false;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
/* 여기에 스타일 추가 가능 */
</style>
