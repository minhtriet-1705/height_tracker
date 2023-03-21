<template>
  <v-container class="setting pl-1 pr-0">
    <v-row class="mt-5">
      <v-col cols="12" justify="center" class="mt-5">
        <h3 class="title">Input Height</h3>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent>
              <v-text-field
                v-model="currentHeight"
                label="Height (in cm)"
                type="number"
                required
              ></v-text-field>
              <v-btn dark style="background-color: #e09430" @click="addHeight"
                >Add Height</v-btn
              >
            </v-form>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="mt-5">
      <v-col>
        <h3 class="title">Your current height</h3>
        <div class="current mt-5">
          <span>
            {{ heightsWithTime[heightsWithTime.length - 1].height }}
          </span>
          <small>.cm</small>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3 class="title">Heigh Chart</h3>
        <v-card>
          <canvas ref="heightChart" height="400px"></canvas>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-1">
      <v-col cols="12" justify="center" class="mt-5">
        <h3 class="title">Height History</h3>
        <v-card>
          <v-list>
            <v-list-item>
              <v-row cols="3">
                <v-col>
                  <v-list-item-title class="font-weight-bold"
                    >Your height</v-list-item-title
                  >
                </v-col>
                <v-col>
                  <v-list-item-title class="font-weight-bold"
                    >Measurement Time</v-list-item-title
                  >
                </v-col>
                <v-col>
                  <v-list-item-title style="color: white">.</v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item
              v-for="(h, index) in heightsWithTime.slice().reverse()"
              :key="index"
            >
              <v-row cols="3" align="center">
                <v-col>
                  <v-list-item-title>{{ h.height }} cm</v-list-item-title>
                </v-col>
                <v-col>
                  <v-list-item-subtitle>{{ h.time }}</v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-action>
                    <v-icon @click="deleteHeight(index)">mdi-delete</v-icon>
                  </v-list-item-action>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store";
import Chart from "chart.js/auto";
import { mapState } from "vuex";

export default {
  store,
  data() {
    return {
      currentHeight: "",
    };
  },
  computed: {
    heightsWithTime() {
      return this.$store.state.heightsWithTime;
    },
    ...mapState(["heightsWithTime"]),
  },
  mounted() {
    this.createChart();
  },
  created() {
    const heightsWithTime = localStorage.getItem("heightsWithTime");
    if (heightsWithTime) {
      this.$store.dispatch("loadHeight", JSON.parse(heightsWithTime));
    } else {
      this.$store.dispatch("loadHeight");
    }
  },
  methods: {
    addHeight() {
      if (this.currentHeight !== "") {
        const now = new Date();
        const currentTime = now.toLocaleString();
        this.$store.dispatch("addHeight", {
          height: this.currentHeight,
          time: currentTime,
        });
        localStorage.setItem(
          "heightsWithTime",
          JSON.stringify(this.$store.state.heightsWithTime)
        );
        this.currentHeight = "";
      }
    },
    deleteHeight(index) {
      this.$store.dispatch("deleteHeight", index);
      localStorage.setItem(
        "heightsWithTime",
        JSON.stringify(this.$store.state.heightsWithTime)
      );
    },
    createChart() {
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Height (cm)",
            data: [],
            backgroundColor: "#e09430",
            borderColor: "#e09430",
            borderWidth: 3,
            fill: false,
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      const ctx = this.$refs.heightChart.getContext("2d");
      this.heightChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    },
    updateChart() {
      const labels = this.heightsWithTime.map((h) => h.time);
      const data = this.heightsWithTime.map((h) => h.height);

      this.heightChart.data.labels = labels;
      this.heightChart.data.datasets[0].data = data;
      this.heightChart.update();
    },
  },
  watch: {
    heightsWithTime() {
      this.updateChart();
    },
  },
};
</script>
<style lang="scss">
.setting {
  background-repeat: repeat-y;
  background-size: cover;
  background-position: center;
  background-color: #e9c79a;
  max-width: 100%;
  height: 100%;
}
.v-card__title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.v-text-field__details {
  color: #666;
}
.v-btn {
  color: #fff;
  background-color: #e09430;
}
.v-btn:hover {
  background-color: #00796b;
}
.height-chart {
  height: 500px;
  margin-top: 20px;
}
.v-list-item__title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.v-list-item__subtitle {
  font-size: 16px;
  color: #e09430;
}
.v-list-item__action {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-icon {
  color: #e09430;
  cursor: pointer;
}
.v-icon:hover {
  color: #e09430;
}
h3.title {
  background-color: #9d6113;
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
}
h3 {
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
}
.current {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;

  text-align: center;
  background-color: white;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 10px solid #9d6113;
  margin: 0 auto 2rem;
}

.current span {
  display: block;
  color: #593506;
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: 1s;
}

.current span:hover {
  font-size: 64px;
}

.current small {
  color: #965d12;
  font-style: italic;
  font-size: 24px;
  margin-bottom: -2rem;
}
</style>
