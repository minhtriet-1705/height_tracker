<template>
  <v-app-bar dark app style="background-color: #e09430">
    <v-app-bar-title style="font-size: 16px"
      >Hello {{ $store.state.personInfo.name }}
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon to="/setting">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon to="/heighttracker">
      <v-icon>mdi-human-male-height</v-icon>
    </v-btn>
  </v-app-bar>
</template>
