<template>
  <v-container class="setting">
    <v-row class="mt-5">
      <v-col cols="12" justify="center" class="mt-5">
        <h3 class="title">Personal Information</h3>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent>
              <v-text-field
                v-model="info.name"
                label="Name"
                required
              ></v-text-field>
              <v-flex xs12 sm6 md4>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Your Date of Birth"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn color="primary" @click="$refs.menu.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-btn dark style="background-color: #e09430" @click="addInfo"
                >Add Info</v-btn
              >
            </v-form>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      menu: false,
      info: {
        name: "",
        age: "",
      },
    };
  },
  methods: {
    addInfo() {
      const age = this.calculateAge();
      this.$store.commit("SET_PERSON_INFO", {
        name: this.info.name,
        age: age,
        dob: this.date,
      });
      this.info.name = "";
      this.date = "";
      localStorage.setItem("personAge", age);
    },

    calculateAge() {
      const today = new Date();
      const birthDate = new Date(this.date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    },
  },
  created() {
    const { name, age, dob } = this.$store.getters.getPersonInfo;
    this.info.name = name;
    this.info.age = age;
    this.date = dob;
  },
};
</script>

<style></style>
