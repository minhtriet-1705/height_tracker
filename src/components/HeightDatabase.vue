<template>
  <v-container class="setting pl-1 pr-0 mt-5">
    <v-row class="mt-5">
      <v-col cols="12" justify="center" class="mt-5">
        <v-card class="height-card" color="#9d6113" theme="dark">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" style="color: aliceblue">
                Your Height
              </v-card-title>
              <v-card-actions>
                <v-btn @click="addToHistory" variant="text">
                  Add to Height History
                </v-btn>
              </v-card-actions>
            </div>
            <h1 class="height-text mt-5">{{ height }} cm</h1>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onValue } from "firebase/database";
import { db } from "@/main";

export default {
  data() {
    return {
      height: null,
    };
  },
  mounted() {
    const heightRef = ref(db, "height");

    onValue(heightRef, (snapshot) => {
      const heightValue = snapshot.val();
      this.height = heightValue;
    });
  },
  methods: {
    addToHistory() {
      const now = new Date();
      const time = now.toLocaleString();
      const height = {
        height: this.height,
        time: time,
      };
      this.$store.dispatch("addHeight", height);
    },
  },
};
</script>

<style>
.height-card {
  padding: 10px;
}

.height-text {
  font-size: 5rem;
  margin: 0;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 1;
}

@media (max-width: 600px) {
  .height-card {
    padding: 5px;
  }

  .height-text {
    font-size: 3rem;
  }
}
</style>
