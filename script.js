const app = Vue.createApp({
  data() {
    return {
      gameStarted: false,
      energyPlayer: 100,
      energyMonster: 100,
      playerActionClass: "normal",
      monsterActionClass: "normal",
      currentRound: 1,
      log: [],
    };
  },
  computed: {
    mayUseSpecialAttack() {
      return this.currentRound < 3;
    },
    mayUseHeal() {
      return this.currentRound < 2;
    },
  },
  watch: {
    energyPlayer() {
      var vm = this;
      if (vm.energyPlayer <= 0) {
        vm.energyPlayer = 0;
        vm.playerActionClass = "is-dead";
        setTimeout(function () {
          vm.endGame();
          alert("You have been defeated!");
        }, 700);
      }
      if (vm.energyPlayer > 100) {
        vm.energyPlayer = 100;
      }
    },
    energyMonster() {
      var vm = this;
      if (vm.energyMonster <= 0) {
        vm.monsterActionClass = "is-dead";
        vm.energyMonster = 0;
        setTimeout(function () {
          alert("Victory!");
          vm.endGame();
        }, 700);
      }
    },
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.energyPlayer = 100;
      this.energyMonster = 100;
    },
    endGame() {
      this.gameStarted = false;
      this.energyPlayer = 100;
      this.energyMonster = 100;
      this.playerActionClass = "normal";
      this.monsterActionClass = "normal";
      this.currentRound = 1;
      this.log = [];
    },
    surrender() {
      this.playerActionClass = "is-dead";
      alert("Enemy wins... :(");
      this.playerActionClass = "normal";
      this.gameStarted = false;
      this.energyPlayer = 100;
      this.energyMonster = 100;
      this.currentRound = 1;
      this.log = [];
    },
    attack() {
      var vm = this;
      vm.energyPlayer -= 15;
      vm.energyMonster -= 10;
      vm.playerActionClass = "is-attack";
      vm.currentRound++;
      setTimeout(function () {
        vm.playerActionClass = "normal";
        if (vm.energyPlayer <= 0) {
          vm.playerActionClass = "is-dead";
        }
      }, 500);
      setTimeout(function () {
        vm.monsterActionClass = "is-attack";
      }, 750);
      setTimeout(function () {
        vm.monsterActionClass = "normal";
      }, 1250);
      vm.log.push({
        class: "alert-info",
        message: "You attack: 10 HP",
      });
      setTimeout(function () {
        vm.log.push({
          class: "alert-danger",
          message: "Enemy attacks: 15 HP",
        });
      }, 500);
    },
    specialAttack() {
      var vm = this;
      vm.energyPlayer -= 20;
      vm.energyMonster -= 25;
      vm.playerActionClass = "is-special-attack";
      vm.currentRound = 1;
      setTimeout(function () {
        vm.playerActionClass = "normal";
        if (vm.energyPlayer <= 0) {
          vm.playerActionClass = "is-dead";
        }
      }, 500);
      setTimeout(function () {
        vm.monsterActionClass = "is-attack";
      }, 750);
      setTimeout(function () {
        vm.monsterActionClass = "normal";
      }, 1250);
      vm.log.push({
        class: "alert-info",
        message: "You attack with special attack: 25 HP",
      });
      setTimeout(function () {
        vm.log.push({
          class: "alert-danger",
          message: "Enemy attack: 20 HP",
        });
      }, 500);
    },
    heal() {
      var vm = this;
      vm.energyPlayer += 25;
      vm.energyPlayer -= 7;
      vm.playerActionClass = "is-heal";
      vm.currentRound = 1;
      setTimeout(function () {
        vm.playerActionClass = "normal";
      }, 500);
      setTimeout(function () {
        vm.monsterActionClass = "is-attack";
      }, 750);
      setTimeout(function () {
        vm.monsterActionClass = "normal";
      }, 1250);
      vm.log.push({
        class: "alert-success",
        message: "You heal: +15 HP",
      });
      setTimeout(function () {
        vm.log.push({
          class: "alert-danger",
          message: "Enemy attack while you heal: 7 HP",
        });
      }, 500);
    },
  },
});

app.mount("#game");
