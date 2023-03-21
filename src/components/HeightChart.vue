<template>
  <div>
    <canvas ref="heightChart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { mapState } from "vuex";

export default {
  name: "height-chart",
  computed: {
    ...mapState(["heightsWithTime"]),
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Height (cm)",
            data: [],
            backgroundColor: "#42a5f5",
            borderColor: "#1e88e5",
            borderWidth: 1,
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
